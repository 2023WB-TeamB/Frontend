import React from 'react'
import styled from 'styled-components'
import ConfirmButton from './ConfirmButton'
import ConfirmIcon from '../../assets/images/Viewer/confirm.svg'
import ConfirmIcon_dark from '../../assets/images/Viewer/confirm_dark.svg'
import BackDrop from './BackDrop'
import { useConfirmBoxStore, useDarkModeStore } from '../../store/store'

const ModalWrapper = styled.div<{ isDarkMode: boolean }>`
  position: fixed;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 430px;
  height: 230px;
  background-color: ${(props) =>
    props.isDarkMode ? 'rgba(44, 44, 44, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.05);
  border-radius: 50px;
  border: 0.5px solid;
  border-color: ${(props) => (props.isDarkMode ? '#383838' : '#c8c8c8')};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  z-index: 1000;
  transition: all ease-in-out 0.5s;
`

const ContextWrapper = styled.div<{ isDarkMode: boolean }>`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};

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
    color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  }
`

const ButtonWrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

interface ModalConfirmProps {
  confirmOption: Array<
    [option: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void]
  >
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  confirmOption,
}) => {
  const {isOpenConfirm, ConfirmLabel} = useConfirmBoxStore()
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  if (isOpenConfirm)
    return (
      <>
        <BackDrop />
        <ModalWrapper isDarkMode={isDarkMode}>
          <ContextWrapper isDarkMode={isDarkMode}>
            <img 
              src={isDarkMode ? ConfirmIcon_dark : ConfirmIcon}
              alt="Confirm Icon"
            />
            <h3>{ConfirmLabel}</h3>
          </ContextWrapper>
          <ButtonWrapper>
            {confirmOption &&
              confirmOption.map((item) => {
                const [option, onClick] = item
                return <ConfirmButton context={option} onClick={onClick} />
              })}
          </ButtonWrapper>
        </ModalWrapper>
      </>
    )
  return (undefined)
}

export default ModalConfirm
