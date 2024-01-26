import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore, useDocIdStore } from '../../../store/store'
import { projectData } from './SidebarPanel';
import { darken } from 'polished';

interface VersionPreviewProps {
  content: projectData
  isActive?: boolean
}

// 개별 미리보기 문서 스타일
const PreviewContent = styled.div<{ isDarkMode: boolean, color: string }>`
  margin: 6px;
  min-width: 88px;
  width: 88px;
  height: 124.4px;
  background-color: ${(props) => (props.color)};
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  line-height: 1.5;
  transition: ease 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;

  // 호버시 확장
  &:hover {
    margin: 0;
    min-width: 100px;
    height: 141.4px;
    font-size: 9.1px;
    transition: ease 0.3s;
  }
`

const Card = styled.div<{ color: string }>`
  padding: 6px;
  margin: 6px;
  min-width: 88px;
  width: 88px;
  height: 124.4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
  &:hover {
    //호버 시 카드 커지는 효과
    transform: scale(1.08);
  }
`

const CreatedAt = styled.div`
  width: 100%;
  text-align: right;
  font-size: 0.5rem;
  font-weight: 400;
`

const Title = styled.div`
  text-align: left;
  font-size: .5rem;
  font-weight: 700;
  line-height: .75rem;
  font-family: 'Inter';
  margin-top: 0.2rem;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  line-height: .75rem; // 한 줄당 태그의 높이를 제어합니다.
  margin-top: 0.3rem;
  overflow: hidden; // 내용이 넘치면 숨깁니다.
`

const Tag = styled.text<{ color: string }>`
  color: ${({ color }) => color};
  background-color: #f1f1f1;
  font-size: 0.47rem;
  border-radius: 0.65rem;
  margin-top: 0.2rem;
  margin-right: 0.15rem;
  padding: 0rem 0.2rem;
`

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
      <CreatedAt>{content.created_at.slice(0, 10)}</CreatedAt>
      <Title>{content.title}</Title>
      <TagWrapper>
        {content.keywords.map((tag, index) => (
          <Tag key={index} color={content.color}>
            {tag.name}
          </Tag>
        ))}
      </TagWrapper>
    </Card>
  )
}

export default VersionPreview
