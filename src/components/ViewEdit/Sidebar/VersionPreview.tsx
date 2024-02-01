import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished';
import { useConfirmBoxStore, useDocContentStore, useDocIdStore, useEditorModeStore } from '../../../store/store'
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

const VersionPreview: React.FC<VersionPreviewProps> = ({ content }) => {
  const {setContent} = useDocContentStore()
  const {isEditor, toggleEditorMode} = useEditorModeStore()
  const {setConfirmAction, openConfirm, setConfirmLabel} = useConfirmBoxStore()
  const {setDocId} = useDocIdStore()

  const handleCardClick = () => {
    if (isEditor) {
      setConfirmLabel("Are you sure you want to leave without saving?")
      setConfirmAction(() => {
        setContent('')
        toggleEditorMode()
        setDocId(content.id)
      })
      openConfirm()
    }
    else 
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
    </Card>
  )
}

export default VersionPreview
