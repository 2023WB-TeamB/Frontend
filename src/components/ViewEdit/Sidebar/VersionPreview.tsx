import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished';
import { useDocIdStore } from '../../../store/store'
import { projectData } from './SidebarPanel';

interface VersionPreviewProps {
  content: projectData
}

const Card = styled.div<{ color: string }>`
  padding: 6px;
  margin: 6px;
  min-width: 88px;
  width: 88px;
  height: 124.4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 15px;
  color: white;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
  background: ${({ color }) =>
    `linear-gradient(135deg, ${color}, ${darken(0.02, color)})`};
  position: relative;
  word-break: break-all;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    //호버 시 카드 커지는 효과
    transform: scale(1.08);
  }
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CreatedAt = styled.div`
  width: 100%;
  margin-top: 2px;
  text-align: center;
  font-size: 0.5rem;
  font-weight: 300;
  color: #ddd;
`

const Title = styled.div`
  text-align: center;
  font-size: .7rem;
  font-weight: 700;
  line-height: .9rem;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

// const TagWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   align-content: flex-start;
//   width: 100%;
//   line-height: .75rem; // 한 줄당 태그의 높이를 제어합니다.
//   margin-top: 0.3rem;
//   overflow: hidden; // 내용이 넘치면 숨깁니다.
// `

// const Tag = styled.text<{ color: string }>`
//   color: ${({ color }) => color};
//   background-color: #f1f1f1;
//   font-size: 0.47rem;
//   border-radius: 0.65rem;
//   margin-top: 0.2rem;
//   margin-right: 0.15rem;
//   padding: 0rem 0.2rem;
// `

const VersionPreview: React.FC<VersionPreviewProps> = ({ content }) => {
  const {setDocId} = useDocIdStore()
  const handleCardClick = () => {
    setDocId(content.id)
  }

  return (
    <Card
      key={content.id}
      color={content.color} 
      onClick={handleCardClick}
    >
      <ContentWrapper>
        <Title>{content.title}</Title>
        <CreatedAt>{content.created_at.slice(0, 10)}</CreatedAt>
      </ContentWrapper>
      {/* <TagWrapper>
        {content.keywords.map((tag, index) => (
          <Tag key={index} color={content.color}>
            {tag.name}
          </Tag>
        ))}
      </TagWrapper> */}
    </Card>
  )
}

export default VersionPreview
