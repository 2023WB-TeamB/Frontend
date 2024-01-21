import React, { useEffect, useState } from 'react'
import { TwitterPicker, ColorResult } from 'react-color'
import styled from 'styled-components'
import ViewDetailsButton from '../ViewDetailsButton'
import { cardColorStore, isDeleteStore, previewOpenStore } from '../../../store/store'
import Swal from 'sweetalert2'
import { rgba, linearGradient } from 'polished'

const Wrapper = styled.div<{ color: string; previewOpen: boolean }>`
  display: flex;
  justify-content: center;
  justify-items: center;
  background: ${({ color }) =>
    linearGradient({
      colorStops: [`${rgba(color, 1)} 0%`, `${rgba(color, 0.9)} 80%`, `${rgba(color, 0.8)} 100%`],
      toDirection: '270deg',
    })};
  color: black;
  width: 34rem;
  height: 39rem;
  padding: 1.7rem;
  border-radius: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);

  position: absolute;
  right: ${({ previewOpen }) => (previewOpen ? '-5%' : '-100%')};
  transition: right 0.5s ease-out;
`

const WhiteLine = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 49.4rem;
  height: 37.4rem;
  padding: 1rem;
  border: 0.1rem solid white;
  border-radius: 20px;
`

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 28rem;
  height: 37rem;
  padding: 1rem;
  border-radius: 20px;
`

// 문서 최근 수정일
const DateLine = styled.p`
  text-align: right;
  margin: 0;
`

// 문서 제목
const Title = styled.h2`
  font-size: 2rem;
  height: 6rem; // 높이를 지정합니다.
  width: 100%; // 너비를 지정합니다.
  margin: 0;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Content = styled.div`
  font-size: 1.2rem;
  height: 18rem;
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 1rem;
  overflow: hidden;
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

interface PreviewContentProps {
  color?: string
  title: string
  created_at: string
  content: string
}

const PreviewContent: React.FC<PreviewContentProps> = ({ color, title, created_at, content }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const { previewOpen, setPreviewOpen } = previewOpenStore()
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
    if (!previewOpen) {
      setDisplayColorPicker(false)
    }
  }, [previewOpen])

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
        setPreviewOpen(false)
      }
    })
  }

  return (
    <Wrapper color={cardColor} previewOpen={previewOpen} onClick={(e) => e.stopPropagation()}>
      <WhiteLine>
        <ContentArea>
          <ButtonsContainer>
            <OptionalButton onClick={handleClick}>🎨</OptionalButton>
            <OptionalButton onClick={handleDelete}>🗑️</OptionalButton>
          </ButtonsContainer>
          <Title>{title}</Title>
          <DateLine>{created_at.slice(0, 10)}</DateLine>
          <Content>{content}</Content>
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
        </ContentArea>
      </WhiteLine>
    </Wrapper>
  )
}

export default PreviewContent
