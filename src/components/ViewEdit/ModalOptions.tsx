import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Swal from 'sweetalert2'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import pdfIcon from '../../assets/images/Viewer/pdf.png'
import pdfIcon_dark from '../../assets/images/Viewer/pdf_dark.svg'
import urlIcon from '../../assets/images/Viewer/url.png'
import urlIcon_dark from '../../assets/images/Viewer/url_dark.svg'
import qrCreateIcon from '../../assets/images/Viewer/qr-code-add.png'
import qrCreateIcon_dark from '../../assets/images/Viewer/qr-code-add_dark.svg'
import closeIcon from '../../assets/images/Viewer/closeIcon.svg'
import closeIcon_dark from '../../assets/images/Viewer/closeIcon_dark.svg'
import OptionButton from './OptionButton'
import BackDrop from './BackDrop'
import {
  useApiUrlStore,
  useDarkModeStore,
  useDocContentStore,
  useDocIdStore,
} from '../../store/store'

const ModalWrapper = styled.div<{ $isDarkMode: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 350px;
  height: 450px;
  background-color: ${(props) =>
    props.$isDarkMode ? 'rgba(42, 42, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
  border: 0.5px solid;
  border-color: ${(props) => (props.$isDarkMode ? '#383838' : '#c8c8c8')};
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.05);
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  z-index: 1000;
  animation: fadeInAnimation 0.2s ease-in-out;

  & h3 {
    margin: 50px 35px 40px;
    height: 60px;
    font-size: 2.5rem;
    font-weight: 700;
    color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  }
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

// 버튼 영역
const OptionsWrapper = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const CloseButton = styled.button`
  margin: 20px;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`

interface ModalOptionsProps {
  isOpenOptions: boolean
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ModalOptions: React.FC<ModalOptionsProps> = ({ isOpenOptions, onClose }) => {
  const { docsApiUrl } = useApiUrlStore()
  const { docId } = useDocIdStore()
  const { title } = useDocContentStore()
  let docUrl: string | undefined

  useEffect(() => {
    docUrl = undefined
  }, [docId])

  // * Toast 알림창
  const ToastInfor = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 1800,
  })

  // * URL 할당 -> docUrl
  const handleUrlShare = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      const response = await axios.post(
        `${docsApiUrl}/share`,
        {
          docs_id: docId,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      docUrl = response.data.share_url
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
    }
  }

  // * URL 클립보드로 복사
  const handleCopyClipBoardURL = async () => {
    try {
      await handleUrlShare()
      if (docUrl) 
        await navigator.clipboard.writeText(docUrl)
      else 
        throw(Error)
      ToastInfor.fire({
        icon: 'success',
        title: 'URL이 복사되었습니다!',
      })
    } catch (err) {
      ToastInfor.fire({
        icon: 'error',
        title: 'URL 복사 실패',
      })
    }
  }

  // * QR 로딩창
  const showQRCode = async () => {
    if (!docUrl) {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: async () => {
          try {
            await handleUrlShare()
            Swal.close()
            showQRCodeModal()
          } catch (error) {
            console.log(error)
          }
        },
      })
    } else {
      showQRCodeModal()
    }
  }

  // * QR 조회창
  const showQRCodeModal = () => {
    if (docUrl)
      Swal.fire({
        text: title,
        imageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${docUrl}`,
        imageAlt: 'QR Code',
        showConfirmButton: true,
      })
    else
      ToastInfor.fire({
        icon: 'error',
        title: 'QR 생성 실패',
      })
  }

  // ? 다운로드할 컴포넌트 ID
  const rootElementId = 'ExternalArea'

  // * PDF 다운로드
  const downloadPdfDocument = async (rootElementId: string) => {
    const input = document.getElementById(rootElementId)
    if (input != null) {
      const canvas = await html2canvas(input)
      const imgData = canvas.toDataURL('image/png')
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4')
      // pdf 가로 세로 사이즈
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      // 이미지의 길이와 pdf의 가로길이가 다르므로 이미지 길이를 기준으로 비율을 구함
      const widthRatio = pageWidth / canvas.width
      const customHeight = canvas.height * widthRatio
      // ? pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, customHeight)
      let heightLeft = customHeight
      let heightAdd = -pageHeight
      // 한 페이지 이상일 경우
      while (heightLeft >= pageHeight) {
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, heightAdd, pageWidth, customHeight)
        heightLeft -= pageHeight
        heightAdd -= pageHeight
        pdf.save(`${title}.pdf`)
      }
    }
  }

  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)

  if (isOpenOptions)
    return (
      <>
        <BackDrop />
        <ModalWrapper $isDarkMode={$isDarkMode}>
          <CloseButton onClick={onClose}>
            <img src={$isDarkMode ? closeIcon_dark : closeIcon} alt="Close" />
          </CloseButton>
          <h3>Export</h3>
          <OptionsWrapper>
            <OptionButton
              icon={$isDarkMode ? pdfIcon_dark : pdfIcon}
              context="Download as PDF"
              onClick={() => downloadPdfDocument(rootElementId)}
            />
            <OptionButton
              icon={$isDarkMode ? urlIcon_dark : urlIcon}
              context="Copy a URL"
              onClick={handleCopyClipBoardURL}
            />
            <OptionButton
              icon={$isDarkMode ? qrCreateIcon_dark : qrCreateIcon}
              context="Make a QR code"
              onClick={showQRCode}
            />
          </OptionsWrapper>
        </ModalWrapper>
      </>
    )
  return undefined
}

export default ModalOptions
