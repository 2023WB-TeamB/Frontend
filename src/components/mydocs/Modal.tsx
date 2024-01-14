import React from 'react'
import styled from 'styled-components'
import ModalContent from './ModalContent'
import { useDarkModeStore } from '../../store/store'

const ModalWrapper = styled.div<{ modalOpen: boolean; isDarkMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.isDarkMode ? 'rgba(32, 32, 32, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  display: flex; // 항상 flex를 유지
  opacity: ${({ modalOpen }) => (modalOpen ? 1 : 0)}; // modalOpen 상태에 따라 opacity 조절
  visibility: ${({ modalOpen }) =>
    modalOpen ? 'visible' : 'hidden'}; // modalOpen 상태에 따라 visibility 조절
  transition: opacity 0.3s ease, visibility 0.3s ease; // opacity와 visibility에 transition 효과 적용
  justify-content: center;
  align-items: center;
  z-index: 3;
`

interface ModalContentProps {
  color?: string
  title: string
  updated_at: string
}

interface ModalProps {
  modalOpen: boolean
  modalContent: ModalContentProps | null
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  modalContent,
  setModalOpen,
}) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  return (
    <ModalWrapper isDarkMode={isDarkMode} modalOpen={modalOpen} onClick={() => setModalOpen(false)}>
      {modalContent && (
        <ModalContent
          color={modalContent.color}
          title={modalContent.title}
          updated_at={modalContent.updated_at}
        />
      )}
    </ModalWrapper>
  )
}

export default Modal
