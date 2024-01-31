import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import { useEffect } from 'react'
import Sidebar from '../components/ViewEdit/Sidebar/SidebarList'
import double_arrow_left from '../assets/images/Viewer/double_arrow_left.svg'
import double_arrow_right from '../assets/images/Viewer/double_arrow_right.svg'
import gallery from '../assets/images/Viewer/gallery button.png'
import version from '../assets/images/Viewer/version button.png'
import exportBtn from '../assets/images/Viewer/share button.png'
import deleteBtn from '../assets/images/Viewer/delete button.png'
import exit from '../assets/images/Viewer/exit button.png'
import SidebarPanel from '../components/ViewEdit/Sidebar/SidebarPanel'
import ModalOptions from '../components/ViewEdit/ModalOptions'
import ModalConfirm from '../components/ViewEdit/ModalConfirm'
import DocField from '../components/ViewEdit/DocField'
import LittleHeader from '../components/ViewEdit/LittleHeader'
import {
  useSidePeekStore,
  useViewerPageOpenStore,
  useConfirmBoxStore,
  useDocIdStore,
  useApiUrlStore,
  useDarkModeStore, 
  useEditorModeStore,
  useDocContentStore,
  useEditorObjectStore,
} from '../store/store'
import { BadgeGuide } from '../components/BadgeGuide'
import ExternalArea from '../components/ViewEdit/ExternalArea'

const StyledForm = styled.div<{ $isDarkMode: boolean }>`
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => (props.$isDarkMode ? '#202020' : 'white')};
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  transition: ease 0.5s;
  overflow: hidden;
`

const StyledDocFieldWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

function ViewerPage() {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const { isOpenSideAlways, toggleOpenSideAlways } = useSidePeekStore()
  const { docId } = useDocIdStore()
  const { isEditor, toggleEditorMode } = useEditorModeStore()
  const { setContent } = useDocContentStore()
  const { setEditor } = useEditorObjectStore()
  const openerStore = useViewerPageOpenStore()
  const {setConfirmAction, openConfirm, setConfirmLabel} = useConfirmBoxStore()
  const navigate = useNavigate()

  const { apiUrl } = useApiUrlStore()

  // 상태관리 제어
  useEffect(() => {
    // 마운트할 때 초기화
    if (isEditor)
        toggleEditorMode()
    setContent('')
    setEditor(null)
    
    return () => {
      // 언마운트할 때 초기화
      if (isEditor)
        toggleEditorMode()
      setContent('')
      setEditor(null)
    }
  }, [])

  // * Toast 알림창
  const ToastInfor = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 1800,
  })

  // 뷰어 나가기
  const handleExitViewer = () => {
    navigate('/mydocs')
  }
  
  // ? 문서 삭제 API
  const handleDeleteDoc = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      await axios.delete(`${apiUrl}/docs/${docId}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      handleExitViewer()
      ToastInfor.fire({
        icon: 'success',
        title: 'Document Delete Successful',
      })
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
      ToastInfor.fire({
        icon: 'error',
        title: 'Document Delete Failed',
      })
    }
  }

  // 문서 삭제 확인
  const openConfirmWithDelete = () => {
    setConfirmLabel('Are you sure you want to delete this file?')
    setConfirmAction(handleDeleteDoc)
    openConfirm()
  }
  // 뷰어 종료 확인
  const openConfirmWithExit = () => {
    setConfirmLabel(isEditor ? 
      'Are you sure you want to leave without saving?' :
      'Are you sure you want to leave this page?'
    )
    setConfirmAction(handleExitViewer)
    openConfirm()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "easeInOut",
        duration: .3,
      }}
    >
      <StyledForm $isDarkMode={$isDarkMode}>
        <LittleHeader />
        <Sidebar
          list={[
            [isOpenSideAlways ? double_arrow_left : double_arrow_right, '', toggleOpenSideAlways],
            [gallery, 'Document', openerStore.openGalleryPanel],
            [version, 'Project', openerStore.openVersionPanel],
            [exportBtn, 'Export', openerStore.openOptions],
            [deleteBtn, 'Delete', openConfirmWithDelete],
            ['', undefined, () => undefined],
            ['', undefined, () => undefined],
            ['', undefined, () => undefined],
            ['', undefined, () => undefined],
            ['', undefined, () => undefined],
            ['', undefined, () => undefined],
            [exit, 'Exit', openConfirmWithExit],
          ]}
        />
        <SidebarPanel />
        <ModalOptions isOpenOptions={openerStore.isOpenOptions} onClose={openerStore.closeOptions} />
        <ModalConfirm />
        <StyledDocFieldWrapper>
          <DocField />
        </StyledDocFieldWrapper>
        <BadgeGuide />
        <ExternalArea />
      </StyledForm>
    </motion.div>
  )
}

export default ViewerPage
