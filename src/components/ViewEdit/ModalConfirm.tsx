import React from 'react'
import styled from 'styled-components'
import ConfirmButton from './ConfirmButton'
import ConfirmIcon from '../../assets/images/Viewer/confirm.svg'
import ConfirmIcon_dark from '../../assets/images/Viewer/confirm_dark.svg'
import BackDrop from './BackDrop'
import { useConfirmBoxStore, useDarkModeStore } from '../../store/store'

const ModalWrapper = styled.div<{ $isDarkMode: boolean }>`
  position: fixed;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 430px;
  height: 230px;
  background-color: ${(props) =>
    props.$isDarkMode ? 'rgba(44, 44, 44, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.05);
  border-radius: 50px;
  border: 0.5px solid;
  border-color: ${(props) => (props.$isDarkMode ? '#383838' : '#c8c8c8')};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  z-index: 1000;
  animation: fadeInAnimation 0.2s ease-in-out;
  
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const ContextWrapper = styled.div<{ $isDarkMode: boolean }>`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};

  & img {
    width: 55px;
    height: 55px;
  }

  & h3 {
    margin: 10px;
    max-width: 300px;
    height: 40px;
    font-size: 1em;
    font-weight: 400;
    text-align: center;
    display: flex;
    align-items: center;
    color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  }
`

const ButtonWrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ModalConfirm: React.FC = () => {
  const {isOpenConfirm, confirmLabel, confirmAction, closeConfirm} = useConfirmBoxStore()
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)

  const handleTrueState = () => {
    confirmAction()
    closeConfirm()
  }

  if (isOpenConfirm)
    return (
      <>
        <BackDrop />
        <ModalWrapper $isDarkMode={$isDarkMode}>
          <ContextWrapper $isDarkMode={$isDarkMode}>
            <img 
              src={$isDarkMode ? ConfirmIcon_dark : ConfirmIcon}
              alt="Confirm Icon"
            />
            <h3>{confirmLabel}</h3>
          </ContextWrapper>
          <ButtonWrapper>
            <ConfirmButton context="Yes" onClick={handleTrueState} />
            <ConfirmButton context="No" onClick={closeConfirm} />
          </ButtonWrapper>
        </ModalWrapper>
      </>
    )
  return undefined
}

export default ModalConfirm
