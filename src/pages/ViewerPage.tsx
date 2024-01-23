import Sidebar from '../components/ViewEdit/Sidebar/SidebarList'
import styled from 'styled-components'
import double_arrow_left from '../assets/images/Viewer/double-arrow-left.png'
import double_arrow_right from '../assets/images/Viewer/double-arrow-right.png'
import gallery from '../assets/images/Viewer/gallery button.png'
import gallery_dark from '../assets/images/Viewer/gallerybutton_dark.svg'
import version from '../assets/images/Viewer/version button.png'
import version_dark from '../assets/images/Viewer/versionbutton_dark.svg'
import exportBtn from '../assets/images/Viewer/share button.png'
import exportBtn_dark from '../assets/images/Viewer/sharebutton_dark.svg'
import deleteBtn from '../assets/images/Viewer/delete button.png'
import deleteBtn_dark from '../assets/images/Viewer/deletebutton_dark.svg'
import exit from '../assets/images/Viewer/exit button.png'
import SidebarPanel from '../components/ViewEdit/Sidebar/SidebarPanel'
import ModalOptions from '../components/ViewEdit/ModalOptions'
import ModalConfirm from '../components/ViewEdit/ModalConfirm'
import DocField from '../components/ViewEdit/DocField'
import LittleHeader from '../components/ViewEdit/LittleHeader'
import { useSidePeekStore, useViewerPageOpenStore, useConfirmBoxStore, useDocIdStore, useApiUrlStore } from '../store/store'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDarkModeStore } from '../store/store'
import axios from 'axios'

const StyledForm = styled.div<{ isDarkMode: boolean }>`
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  transition: ease .5s;
  overflow: hidden;
`

const StyledDocFieldWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

function ViewerPage() {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { isOpenSideAlways, toggleOpenSideAlways } = useSidePeekStore()
  const { docId } = useDocIdStore()
  const openerStore = useViewerPageOpenStore()
  const confirmBoxStore = useConfirmBoxStore()
  const [confirmLabel, setConfirmLabel] = useState('')
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)
  const navigate = useNavigate()

  const {apiUrl} = useApiUrlStore()

  //? 문서 삭제 API
  const handleDeleteDoc = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      await axios.delete(
        `${apiUrl}/${docId}`,
        {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        },
      )
      console.log("document delete success")
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
      console.log("document delete fail")
    }
  }

  // 문서 삭제 확인
  const openConfirmWithDelete = () => {
    setConfirmLabel('정말로 이 문서를 삭제하실껀가요?')
    setConfirmAction(() => () => {
      handleDeleteDoc()
    })
    confirmBoxStore.setConfirmLabel(confirmLabel)
    confirmBoxStore.openConfirm()
  }
  // 뷰어 종료 확인
  const openConfirmWithExit = () => {
    setConfirmLabel('나가기')
    setConfirmAction(() => () => {
      navigate('/mydocs')
    })
    confirmBoxStore.setConfirmLabel(confirmLabel)
    confirmBoxStore.openConfirm()
  }

  // 확인 모달창 핸들러
  const handleConfirmYes = () => {
    confirmAction && confirmAction()
    confirmBoxStore.closeConfirm()
  }

  return (
    <StyledForm isDarkMode={isDarkMode}>
      <LittleHeader/>
      <Sidebar
        list={[
          [isOpenSideAlways ? double_arrow_left : double_arrow_right, , toggleOpenSideAlways],
          [isDarkMode ? gallery_dark : gallery, "Gallery", openerStore.openGalleryPanel],
          [isDarkMode ? version_dark : version, "Version", openerStore.openVersionPanel],
          [isDarkMode ? exportBtn_dark : exportBtn, "Export", openerStore.openOptions],
          [isDarkMode ? deleteBtn_dark : deleteBtn, "Delete", openConfirmWithDelete],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [exit, "Exit", openConfirmWithExit],
        ]}/>
      <SidebarPanel/>
      <ModalOptions isOpenOptions={openerStore.isOpenOptions} onClose={openerStore.closeOptions} />
      <ModalConfirm
        isOpenConfirm={confirmBoxStore.isOpenConfirm}
        label={confirmLabel}
        confirmOption={[
          ['Yes', handleConfirmYes],
          ['No', confirmBoxStore.closeConfirm],
        ]}
      />
      <StyledDocFieldWrapper>
        <DocField/>
      </StyledDocFieldWrapper>
    </StyledForm>
  )
}

export default ViewerPage
