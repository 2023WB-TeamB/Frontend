import React, { useEffect, useState } from 'react'
import { TwitterPicker, ColorResult } from 'react-color'
import styled from 'styled-components'
import ViewDetailsButton from '../ViewDetailsButton'
import { cardColorStore, isDeleteStore, previewOpenStore } from '../../../store/store'
import Swal from 'sweetalert2'
import ReactMarkdown from 'react-markdown'

const Container = styled.div<{ previewOpen: boolean }>`
  position: absolute;
  width: 29rem;
  height: 44rem;
  right: ${({ previewOpen }) => (previewOpen ? '8%' : '-100%')};
  transition: right 0.5s ease-out;
`

// 프리뷰의 실제 내용이 들어가는 부분
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  width: 27rem;
  height: 42rem;
  padding: 0 3rem;
  border: 0.03rem solid black;
  border-radius: 1.5rem;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
  position: absolute;
  transition: right 0.5s ease-out;
`

// 페이지 겹쳐보이는 효과를 위한 빈 모달
const EmptyPage = styled.div<{ color: string }>`
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: -1;
  background: ${({ color }) => color};
  width: 27rem;
  height: 42rem;
  padding: 0 3rem;
  border: 0.01rem solid black;
  border-radius: 1.5rem;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
`

// 프리뷰 전체 내용을 묶어놓은 레이아웃
const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 28rem;
  height: 37rem;
  padding: 1rem;
  border-radius: 20px;
`

// 버튼 부분
const ButtonsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 0.2rem;
`

// 상단 요소(레포, 제목, 태그)
const UpperWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 30rem;
`

// 하단 요소(생성일, ViewDetails)
const LowerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`

// 레포 이름
const Repo = styled.p`
  color: black;
  text-align: left;
  height: 1.5rem;
  font-size: 1.05rem;
  margin-top: 0;
  margin-bottom: 0rem;
`

// 문서 제목
const Title = styled.h2`
  font-size: 2rem;
  width: 95%; // 너비를 지정합니다.
  margin: 0;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin-top: 0.6rem;
`
const Tag = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  background-color: #f8f8f8;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  margin-top: 0.4rem;
  margin-right: 0.5rem;
  padding: 0 0.5rem;
`

// 문서 미리보기(마크다운 적용)
const Content = styled.div`
  font-size: 0.4rem;
  width: 90%;
  height: 20rem;
  margin-top: 1rem;
  padding: 0 1.2rem;
  border-top: 0.05rem solid darkgray;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

// 문서 생성일
const CreatedAt = styled.p<{ color: string }>`
  color: ${({ color }) => color};
  text-align: left;
  height: 1.5rem;
  font-size: 0.9rem;
  margin: 0;
`

// 추가 버튼 (팔레트, 삭제)
const OptionalButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem 0.7rem;
  margin-left: 1rem;
  outline: none;
  transition: background-color 0.2s ease; // 배경색의 전환 시간 설정
  &:hover {
    background-color: rgba(0, 0, 0, 0.05); // 호버 시 배경색 조금 더 밝게
  }
  &:active {
    outline: none; // 클릭 시 테두리가 나타나지 않도록 설정
    background-color: rgba(0, 0, 0, 0.1); // 클릭 시 배경색 더 밝게
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
  repo: string
  tags: string[]
}

const PreviewContent: React.FC<PreviewContentProps> = ({
  color,
  title,
  created_at,
  content,
  repo,
  tags,
}) => {
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
    <Container previewOpen={previewOpen} onClick={(e) => e.stopPropagation()}>
      <Wrapper>
        <ContentArea>
          <ButtonsContainer>
            <OptionalButton onClick={handleClick}>🎨</OptionalButton>
            <OptionalButton onClick={handleDelete}>🗑️</OptionalButton>
          </ButtonsContainer>
          <UpperWrapper>
            <Repo>{repo}</Repo>
            <Title>{title}</Title>
            <TagWrapper>
              {tags.map((tag, index) => (
                <Tag key={index} color={cardColor}>
                  {tag}
                </Tag>
              ))}
            </TagWrapper>
            <Content>
              <ReactMarkdown>{content}</ReactMarkdown>
            </Content>
          </UpperWrapper>
          <LowerWrapper>
            <CreatedAt color={cardColor}>{created_at.slice(0, 10)}</CreatedAt>
            <ViewDetailsButton />
          </LowerWrapper>
          {displayColorPicker ? (
            <>
              <Overlay onClick={handleClose} />
              <ColorPickerWrapper>
                <TwitterPicker color={cardColor} onChange={handleChange} />
              </ColorPickerWrapper>
            </>
          ) : null}
        </ContentArea>
      </Wrapper>
      <EmptyPage color={cardColor} />
    </Container>
  )
}

export default PreviewContent
