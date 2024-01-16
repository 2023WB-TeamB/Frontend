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
  const [isOpenSidePanel, setIsOpenSidePanel] = useState(false)
  const [isOpenOptions, setIsOpenOptions] = useState(false)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [confirmLabel, setConfirmLabel] = useState('')
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)
  const navigate = useNavigate()

  // isOpenSidePanel ~
  // 사이드 확장 패널 여부
  const openSidePanel = () => {
    setIsOpenSidePanel(true)
  }
  const closeSidePanel = () => {
    setIsOpenSidePanel(false)
  }

  // isOpenOptions ~
  // Export 모달창 여부
  const openOptions = () => {
    setIsOpenOptions(true)
    setIsOpenSidePanel(false)
  }
  const closeOptions = () => {
    setIsOpenOptions(false)
  }

  // isOpenConfirm ~
  // 확인 모달창 여부
  // 문서 삭제 확인
  const openConfirmWithDelete = () => {
    setConfirmLabel('정말로 이 문서를 삭제하실껀가요?')
    setConfirmAction(() => {
      // 문서 삭제 로직
    })
    setIsOpenConfirm(true)
    setIsOpenSidePanel(false)
  }
  // 뷰어 종료 확인
  const handleExitClick = () => {
    setConfirmLabel('나가기')
    setConfirmAction(() => () => {
      navigate('/')
    })
    setIsOpenConfirm(true)
  }
  const closeConfirm = () => {
    setIsOpenConfirm(false)
  }
  // 확인 모달창 핸들러
  const handleConfirmYes = () => {
    confirmAction && confirmAction()
    setIsOpenConfirm(false)
  }

  return (
    <StyledForm isDarkMode={isDarkMode}>
      <Sidebar
        list={[
          [profile, closeSidePanel],
          [isDarkMode ? gallery_dark : gallery, openSidePanel],
          [isDarkMode ? version_dark : version, openSidePanel],
          [isDarkMode ? exportBtn_dark : exportBtn, openOptions],
          [isDarkMode ? deleteBtn_dark : deleteBtn, openConfirmWithDelete],
          [''],
          [''],
          [''],
          [''],
          [exit, handleExitClick],
        ]}
        isOpedSidePanel={isOpenSidePanel}></Sidebar>
      <SidebarPanel isOpenSidePanel={isOpenSidePanel} onClose={closeSidePanel} />
      <ModalOptions isOpenOptions={isOpenOptions} onClose={closeOptions} />
      <ModalConfirm
        isOpenConfirm={isOpenConfirm}
        label={confirmLabel}
        confirmOption={[
          ['Yes', handleConfirmYes],
          ['No', closeConfirm],
        ]}
      />
      <DocField isOpenSidePanel={isOpenSidePanel} />
    </StyledForm>
  )
}

export default ViewerPage
