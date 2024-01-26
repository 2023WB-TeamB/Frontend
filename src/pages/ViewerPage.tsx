import Sidebar from '../components/ViewEdit/Sidebar/SidebarList'
import styled from 'styled-components'
import double_arrow_left from '../assets/images/Viewer/double_arrow_left.svg'
import double_arrow_left_dark from '../assets/images/Viewer/double_arrow_left_dark.svg'
import double_arrow_right from '../assets/images/Viewer/double_arrow_right.svg'
import double_arrow_right_dark from '../assets/images/Viewer/double_arrow_right_dark.svg'
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
} from '../store/store'
import { BadgeGuide } from '../components/BadgeGuide'

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
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { isOpenSideAlways, toggleOpenSideAlways } = useSidePeekStore()
  const { docId } = useDocIdStore()
  const openerStore = useViewerPageOpenStore()
  const confirmBoxStore = useConfirmBoxStore()
  const [confirmLabel, setConfirmLabel] = useState('')
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)
  const navigate = useNavigate()

  const { apiUrl } = useApiUrlStore()

  //? 문서 삭제 API
  const handleDeleteDoc = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      await axios.delete(`${apiUrl}/${docId}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      console.log('document delete success')
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
      console.log('document delete fail')
    }
  }

  // 문서 삭제 확인
  const openConfirmWithDelete = () => {
    setConfirmLabel('Are you sure you want to delete this file?')
    setConfirmAction(() => () => {
      handleDeleteDoc()
    })
    confirmBoxStore.setConfirmLabel(confirmLabel)
    confirmBoxStore.openConfirm()
  }
  // 뷰어 종료 확인
  const openConfirmWithExit = () => {
    setConfirmLabel('Are you sure you want to leave this page?')
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
      <LittleHeader />
      <Sidebar
        list={[
          [isOpenSideAlways ? double_arrow_left : double_arrow_right, , toggleOpenSideAlways],
          [gallery, 'Gallery', openerStore.openGalleryPanel],
          [version, 'Version', openerStore.openVersionPanel],
          [exportBtn, 'Export', openerStore.openOptions],
          [deleteBtn, 'Delete', openConfirmWithDelete],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [exit, 'Exit', openConfirmWithExit],
        ]}
      />
      <SidebarPanel />
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
        <DocField />
      </StyledDocFieldWrapper>
      <BadgeGuide />
    </StyledForm>
  )
}

export default ViewerPage
