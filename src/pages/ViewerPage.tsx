import Sidebar from "../components/Sidebar/SidebarList"
import styled from "styled-components"
import profile from "../assets/images/profile.png"
import gallery from "../assets/images/gallery button.png"
import version from "../assets/images/version button.png"
import exportBtn from "../assets/images/share button.png"
import deleteBtn from "../assets/images/delete button.png"
import exit from "../assets/images/exit button.png"
import SidebarPanel from "../components/Sidebar/SidebarPanel"
import ModalOptions from "../components/ModalOptions"
import ModalConfirm from "../components/ModalConfirm"
import MarkdownArea from "../components/MarkdownArea"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const StyledForm = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: start;
`;

function ViewerPage() {
  const [isOpenSidePanel, setIsOpenSidePanel] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [confirmLabel, setConfirmLabel] = useState('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const navigate = useNavigate();

  // isOpenSidePanel ~
  // 사이드 확장 패널 여부
  const openSidePanel = () => {
    setIsOpenSidePanel(true);
  }
  const closeSidePanel = () => {
    setIsOpenSidePanel(false);
  }
  
  // isOpenOptions ~
  // Export 모달창 여부
  const openOptions = () => {
    setIsOpenOptions(true);
    setIsOpenSidePanel(false);
  };
  const closeOptions = () => {
    setIsOpenOptions(false);
  };
  
  // isOpenConfirm ~
  // 확인 모달창 여부
  // 문서 삭제 확인
  const openConfirmWithDelete = () => {
    setConfirmLabel('정말로 이 문서를 삭제하실껀가요?');
    setConfirmAction(() => {
      // 문서 삭제 로직
    });
    setIsOpenConfirm(true);
    setIsOpenSidePanel(false);
  };
  // 뷰어 종료 확인
  const handleExitClick = () => {
    setConfirmLabel('나가기');
    setConfirmAction(() => () => {
      navigate('/');
    });
    setIsOpenConfirm(true);
  };
  const closeConfirm = () => {
    setIsOpenConfirm(false);
  }
  // 확인 모달창 핸들러
  const handleConfirmYes = () => {
    confirmAction && confirmAction();
    setIsOpenConfirm(false);
  };
  
  return (
    <StyledForm>
      <Sidebar list={[[profile, closeSidePanel],
        [gallery, openSidePanel], 
        [version, openSidePanel], 
        [exportBtn, openOptions], 
        [deleteBtn, openConfirmWithDelete], 
        [""], 
        [""], 
        [""], 
        [""], 
        [exit, handleExitClick]]}>
      </Sidebar>
      <SidebarPanel isOpenSidePanel={isOpenSidePanel} onClose={closeSidePanel}/>
      <ModalOptions isOpenOptions={isOpenOptions} onClose={closeOptions}/>
      <ModalConfirm isOpenConfirm={isOpenConfirm}
        label={confirmLabel}
        confirmOption={[
          ["Yes", handleConfirmYes],
          ["No", closeConfirm]
        ]}/>
      <MarkdownArea isOpenSidePanel={isOpenSidePanel}></MarkdownArea>
    </StyledForm>
  )
}

export default ViewerPage
