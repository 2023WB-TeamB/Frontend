import React, { useEffect } from 'react'
import styled from 'styled-components'
import ViewDetailsButton from './ViewDetailsButton'
import { cardColorStore } from '../../store/store'
import PalleteButton from './PalleteButton'
import DeleteButton from './DeleteButton'

interface ContentProps {
  color: string
}

// 캐러셀 모달 창
const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: white;
  color: black;
  font-size: 1rem;
  width: 19rem;
  height: 26rem;
  padding: 1.7rem 2rem;
  border: 0.03rem solid black;
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
  background: ${({ color }) => color};
  width: 19rem;
  height: 26rem;
  padding: 1.7rem 2rem;
  border: 0.01rem solid black;
  border-radius: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
`

// Repo, Title, Tags
const UpperWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 21rem;
`

// createdAt, ViewDetails
const LowerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

// 레포 이름
const Repo = styled.p`
  color: black;
  text-align: left;
  height: 1.5rem;
  font-size: 0.9rem;
  margin-top: 1rem;
  margin-bottom: 0;
`

// 문서 제목
const Title = styled.h2`
  font-size: 1.6rem;
  width: 90%; // 너비를 지정합니다.
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
`

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin-top: 0rem;
`
const Tag = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  background-color: #f8f8f8;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.6rem;
  padding: 0 0.5rem;
`

// 문서 생성일
const CreatedAt = styled.p<{ color: string }>`
  color: ${({ color }) => color};
  text-align: left;
  height: 1.5rem;
  font-size: 0.9rem;
  margin: 0;
`

// 팔레트, 삭제 버튼 포장
const ButtonsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

interface ModalContentProps {
  color?: string
  title: string
  created_at: string
  repo: string
  tags: string[]
}

const ModalContent: React.FC<ModalContentProps> = ({ color, title, created_at, repo, tags }) => {
  const { cardColor, setCardColor } = cardColorStore((state) => ({
    cardColor: state.cardColor,
    setCardColor: state.setCardColor,
  }))

  // props로 받은 color 모달에 적용
  useEffect(() => {
    setCardColor(color || 'rgba(0, 0, 0, 1)')
  }, [color])

  return (
    <>
      <Content color={cardColor} onClick={(e) => e.stopPropagation()}>
        <ButtonsContainer>
          <PalleteButton />
          <DeleteButton />
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
        </UpperWrapper>
        <LowerWrapper>
          <CreatedAt color={cardColor}>{created_at.slice(0, 10)}</CreatedAt>
          <ViewDetailsButton />
        </LowerWrapper>
      </Content>
      <EmptyPage color={cardColor} zindex={-1} translateX={-47} translateY={-47} />
    </>
  )
}

export default ModalContent
