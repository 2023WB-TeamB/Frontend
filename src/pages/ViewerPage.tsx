import Sidebar from '../components/ViewEdit/Sidebar/SidebarList'
import styled from 'styled-components'
import profile from '../assets/images/profile.png'
import gallery from '../assets/images/gallery button.png'
import gallery_dark from '../assets/images/gallerybutton_dark.svg'
import version from '../assets/images/version button.png'
import version_dark from '../assets/images/versionbutton_dark.svg'
import exportBtn from '../assets/images/share button.png'
import exportBtn_dark from '../assets/images/sharebutton_dark.svg'
import deleteBtn from '../assets/images/delete button.png'
import deleteBtn_dark from '../assets/images/deletebutton_dark.svg'
import exit from '../assets/images/exit button.png'
import SidebarPanel from '../components/ViewEdit/Sidebar/SidebarPanel'
import ModalOptions from '../components/ViewEdit/ModalOptions'
import ModalConfirm from '../components/ViewEdit/ModalConfirm'
import DocField from '../components/ViewEdit/DocField'
import LittleHeader from '../components/ViewEdit/LittleHeader'
import { useSidePeekStore, useViewerPageOpenStore, useConfirmBoxStore } from '../store/store'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDarkModeStore } from '../store/store'

const StyledForm = styled.div<{ isDarkMode: boolean }>`
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
`

function ViewerPage() {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const toggleOpenSideAlways = useSidePeekStore((state) => state.toggleOpenSideAlways)
  const openerStore = useViewerPageOpenStore()
  const confirmBoxStore = useConfirmBoxStore()
  const [confirmLabel, setConfirmLabel] = useState('')
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)
  const navigate = useNavigate()

  // 문서 삭제 확인
  const openConfirmWithDelete = () => {
    setConfirmLabel('정말로 이 문서를 삭제하실껀가요?')
    setConfirmAction(() => {
      // 문서 삭제 로직
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
          [profile, toggleOpenSideAlways],
          [isDarkMode ? gallery_dark : gallery, openerStore.openGalleryPanel],
          [isDarkMode ? version_dark : version, openerStore.openVersionPanel],
          [isDarkMode ? exportBtn_dark : exportBtn, openerStore.openOptions],
          [isDarkMode ? deleteBtn_dark : deleteBtn, openConfirmWithDelete],
          [''],
          [''],
          [''],
          [''],
          [exit, openConfirmWithExit],
        ]}/>
      <SidebarPanel isOpenSidePanel={openerStore.isOpenGalleryPanel} onClose={openerStore.closeGalleryPanel} />
      <SidebarPanel isOpenSidePanel={openerStore.isOpenVersionPanel} onClose={openerStore.closeVersionPanel} />
      <ModalOptions isOpenOptions={openerStore.isOpenOptions} onClose={openerStore.closeOptions} />
      <ModalConfirm
        isOpenConfirm={confirmBoxStore.isOpenConfirm}
        label={confirmLabel}
        confirmOption={[
          ['Yes', handleConfirmYes],
          ['No', confirmBoxStore.closeConfirm],
        ]}
      />
      <DocField/>
    </StyledForm>
  )
}

export default ViewerPage
