import React, { useEffect } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import ViewDetailsButton from '../ViewDetailsButton'
import { cardColorStore, previewOpenStore, useDarkModeStore } from '../../../store/store'
import PalleteButton from '../PalleteButton'
import DeleteButton from '../DeleteButton'

const Container = styled.div<{ previewOpen: boolean }>`
  position: absolute;
  width: 29rem;
  height: 44rem;
  right: ${({ previewOpen }) => (previewOpen ? '8%' : '-100%')};
  transition: right 0.5s ease-out;
`

// 프리뷰의 실제 내용이 들어가는 부분
const Wrapper = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.$isDarkMode ? '#2C2C2C' : 'white')};
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  width: 27rem;
  height: 42rem;
  padding: 0 3rem;
  border: 0.03rem solid black;
  border-radius: 1.5rem;
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.16),
    0px 3px 6px rgba(0, 0, 0, 0.23);
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
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.16),
    0px 3px 6px rgba(0, 0, 0, 0.23);
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
  flex-shrink: 0;
  text-align: left;
  max-height: 2.8rem;
  font-size: 1.05rem;
  margin-top: 0;
  margin-bottom: 0.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
`

// 문서 제목
const Title = styled.h2`
  flex-shrink: 0;
  font-size: 2rem;
  width: 95%; // 너비를 지정합니다.
  max-height: 5.4rem;
  line-height: 2.5rem;
  margin: 0;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TagWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin-top: 0.3rem;
  line-height: 1.2rem;
  max-height: 3.9rem;
  overflow: hidden;
`
const Tag = styled.div<{ color: string; $isDarkMode: boolean }>`
  color: ${({ color }) => color};
  background-color: ${(props) => (props.$isDarkMode ? '#353535' : '#f8f8f8')};
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  padding: 0 0.5rem;
`

// 문서 미리보기(마크다운 적용)
const Content = styled.div`
  flex-grow: 1;
  font-size: 0.5rem;
  width: 90%;
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

interface PreviewContentProps {
  color: string
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
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const { previewOpen } = previewOpenStore()
  const { cardColor, setCardColor } = cardColorStore((state) => ({
    cardColor: state.cardColor,
    setCardColor: state.setCardColor,
  }))

  // props로 받은 color 모달에 적용
  useEffect(() => {
    setCardColor(color || 'rgba(0, 0, 0, 1)')
  }, [color])

  return (
    <Container previewOpen={previewOpen} onClick={(e) => e.stopPropagation()}>
      <Wrapper $isDarkMode={$isDarkMode}>
        <ContentArea>
          <ButtonsContainer>
            <PalleteButton />
            <DeleteButton />
          </ButtonsContainer>
          <UpperWrapper>
            <Repo>{repo}</Repo>
            <Title>{title}</Title>
            <TagWrapper>
              {tags.map((tag, index) => (
                <Tag key={index} color={cardColor} $isDarkMode={$isDarkMode}>
                  {tag}
                </Tag>
              ))}
            </TagWrapper>
            <Content>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
            </Content>
          </UpperWrapper>
          <LowerWrapper>
            <CreatedAt color={cardColor}>{created_at.slice(0, 10)}</CreatedAt>
            <ViewDetailsButton />
          </LowerWrapper>
        </ContentArea>
      </Wrapper>
      <EmptyPage color={cardColor} />
    </Container>
  )
}

export default PreviewContent
