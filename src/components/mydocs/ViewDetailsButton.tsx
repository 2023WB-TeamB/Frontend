import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
  cardColorStore,
  cardIdStore,
  modalOpenStore,
  previewOpenStore,
  useDocIdStore,
} from '../../store/store'
import { useModalStore } from '../ModalStore'

const ImageButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.3rem 0.4rem;
  border: none;
  background-color: rgba(0, 0, 0, 0); // 초기 배경색을 투명하게 설정
  cursor: pointer;
  transition: background-color 0.3s ease-in-out; // 배경색의 전환 시간 설정
  &:hover {
    background-color: rgba(0, 0, 0, 0.05); // 호버 시 배경색 조금 더 밝게
  }
  &:active {
    outline: none; // 클릭 시 테두리가 나타나지 않도록 설정
    background-color: rgba(0, 0, 0, 0.1); // 클릭 시 배경색 더 밝게
  }
  &:focus {
    outline: none;
  }
`

function ViewDetailsIcon({ color }: { color: string }) {
  return (
    <svg width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.35669 17L0 15.4913L6.28662 8.5L0 1.50875L1.35669 0L9 8.5L1.35669 17Z"
        fill={color}
      />
      <path
        d="M19.3567 17L18 15.4913L24.2866 8.5L18 1.50875L19.3567 0L27 8.5L19.3567 17Z"
        fill={color}
      />
      <path
        d="M10.3567 17L9 15.4913L15.2866 8.5L9 1.50875L10.3567 0L18 8.5L10.3567 17Z"
        fill={color}
      />
    </svg>
  )
}

const Text = styled.span<{ color: string }>`
  margin-right: 0.4rem; // 이미지와 글씨 사이의 거리를 늘립니다.
  color: ${({ color }) => color}; // 글씨 색을 흰색으로 바꿉니다.
  font-size: 1.2rem; // 글씨 크기를 조정합니다.
`

const ViewDetailsButton: React.FC = () => {
  const { cardId } = cardIdStore((state) => ({
    cardId: state.cardId,
  }))
  const { setDocId } = useDocIdStore((state) => ({
    setDocId: state.setDocId,
  }))
  const { setModalOpen } = modalOpenStore()
  const { setPreviewOpen } = previewOpenStore()
  const { cardColor } = cardColorStore((state) => ({
    cardColor: state.cardColor,
  }))

  const navigate = useNavigate() // useNavigate 추가
  const { searchListClose } = useModalStore()

  const handleClick = () => {
    searchListClose() // 검색모달 close
    // 클릭 이벤트 추가
    const path = window.location.pathname.replace('mydocs', 'viewer')
    setDocId(cardId)
    navigate(path)
    setModalOpen(false)
    setPreviewOpen(false)
  }

  return (
    <ImageButton onClick={handleClick}>
      <Text color={cardColor}>View Details</Text>
      <ViewDetailsIcon color={cardColor} />
    </ImageButton>
  )
}

export default ViewDetailsButton
