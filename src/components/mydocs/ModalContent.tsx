import React, { useEffect, useState } from 'react'
import { TwitterPicker, ColorResult } from 'react-color'
import styled from 'styled-components'
import ViewDetailsButton from './ViewDetailsButton'
import { cardColorStore, isDeleteStore, modalOpenStore } from '../../store/store'
import Swal from 'sweetalert2'
import { darken } from 'polished'

interface ContentProps {
  color: string
}

const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: ${({ color }) => `linear-gradient(135deg, ${color}, ${darken(0.02, color)})`};
  color: white;
  font-size: 1rem;
  width: 20rem;
  height: 26rem;
  padding: 1.7rem;
  border-radius: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
`

interface PageProps {
  color: string
  zindex: number
  translateX: number // translateX 값을 props로 받습니다.
  translateY: number // translateY 값을 props로 받습니다.
}

// 페이지 겹쳐보이는 효과를 위한 빈 모달
const EmptyPage = styled.div<PageProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(${({ translateX }) => translateX}%, ${({ translateY }) => translateY}%);
  z-index: ${({ zindex }) => zindex || 0};
  background: ${({ color }) => `linear-gradient(135deg, ${color}, ${darken(0.04, color)})`};
  width: 20rem;
  height: 26rem;
  padding: 1.7rem;
  border-radius: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
`

// 문서 최근 수정일
const DateLine = styled.p`
  text-align: left;
  margin: 0.6rem 0;
`

// 문서 제목
const Title = styled.h2`
  font-size: 1.5rem;
  height: 19rem; // 높이를 지정합니다.
  width: 100%; // 너비를 지정합니다.
  margin: 0;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
// 추가 버튼 (팔레트, 삭제)
const OptionalButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem 0.7rem;
  margin-left: 1rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: box-shadow 0.2s ease;
  &:active {
    outline: 1px solid white; // 클릭 시 하얀색 테두리가 나타나도록 설정
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 2px 0px rgba(0, 0, 0, 0.1);
  }
  &:focus {
    outline: none; // 포커스 시 테두리가 나타나지 않도록 설정
  }
`

// 색상 선택 도구를 감싸는 컴포넌트
const ColorPickerWrapper = styled.div`
  position: absolute;
  top: 30%;
  right: 27%;
  z-index: 2;
`
const ButtonsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
// 색상 선택 도구 오버레이
const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`

interface ModalContentProps {
  color?: string
  title: string
  created_at: string
}

const ModalContent: React.FC<ModalContentProps> = ({ color, title, created_at }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const { modalOpen, setModalOpen } = modalOpenStore()
  const { setIsDelete } = isDeleteStore()
  const { cardColor, setCardColor } = cardColorStore((state) => ({
    cardColor: state.cardColor,
    setCardColor: state.setCardColor,
  }))

  // props로 받은 color 모달에 적용
  useEffect(() => {
    setCardColor(color || 'rgba(0, 0, 0, 1)')
  }, [color])

  // 모달 창 닫힐 때 색상 선택 도구 자동으로 닫히게 함
  useEffect(() => {
    if (!modalOpen) {
      setDisplayColorPicker(false)
    }
  }, [modalOpen])

  // 팔레트 버튼 누르면 색상 선택 도구 열림/닫힘
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  // 색상 선택 도구 외부 클릭하면 닫힘
  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  // 선택한 색상 cardColor 상태에 저장 => 모달 색상 변경(Here) / 모달 닫을 때 카드 색상 변경(MyDocsPage)
  const handleChange = (color: ColorResult) => {
    setCardColor(color.hex)
  }

  // 삭제 핸들링
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDelete(true)
        setModalOpen(false)
      }
    })
  }

  return (
    <>
      <Content color={cardColor} onClick={(e) => e.stopPropagation()}>
        <ButtonsContainer>
          <OptionalButton onClick={handleClick}>🎨</OptionalButton>
          <OptionalButton onClick={handleDelete}>🗑️</OptionalButton>
        </ButtonsContainer>
        <DateLine>{created_at.slice(0, 10)}</DateLine>
        <Title>{title}</Title>
        <ButtonsContainer>
          <ViewDetailsButton />
        </ButtonsContainer>

        {displayColorPicker ? (
          <>
            <Overlay onClick={handleClose} />
            <ColorPickerWrapper>
              <TwitterPicker color={cardColor} onChange={handleChange} />
            </ColorPickerWrapper>
          </>
        ) : null}
      </Content>
      <EmptyPage color={cardColor} zindex={-1} translateX={-49} translateY={-49} />
      <EmptyPage color={cardColor} zindex={-2} translateX={-48} translateY={-48} />
    </>
  )
}

export default ModalContent
