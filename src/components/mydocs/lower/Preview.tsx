import React from 'react'
import styled from 'styled-components'
import PreviewContent from './PreviewContent'
import { useDarkModeStore } from '../../../store/store'

const PreviewWrapper = styled.div<{ previewOpen: boolean; isDarkMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.isDarkMode ? 'rgba(32, 32, 32, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  display: flex; // 항상 flex를 유지
  opacity: ${({ previewOpen }) => (previewOpen ? 1 : 0)}; // previewOpen 상태에 따라 opacity 조절
  visibility: ${({ previewOpen }) =>
    previewOpen ? 'visible' : 'hidden'}; // previewOpen 상태에 따라 visibility 조절
  transition: opacity 0.3s ease, visibility 0.3s ease; // opacity와 visibility에 transition 효과 적용
  justify-content: center;
  align-items: center;
  z-index: 3;
`

interface PreviewContentProps {
  color?: string
  title: string
  created_at: string
  content: string
  repo: string
  tags: string[]
}

interface PreviewProps {
  previewOpen: boolean
  previewContent: PreviewContentProps | null
  setPreviewOpen: (Open: boolean) => void
}

const Preview: React.FC<PreviewProps> = ({ previewOpen, previewContent, setPreviewOpen }) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  return (
    <PreviewWrapper
      isDarkMode={isDarkMode}
      previewOpen={previewOpen}
      onClick={() => setPreviewOpen(false)}>
      {previewContent && (
        <PreviewContent
          color={previewContent.color}
          title={previewContent.title}
          created_at={previewContent.created_at}
          content={previewContent.content}
          repo={previewContent.repo}
          tags={previewContent.tags}
        />
      )}
    </PreviewWrapper>
  )
}

export default Preview
