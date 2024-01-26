import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore } from '../../../store/store'

interface GalleryPreviewProps {
  content: {
    id: number
    title: string
    color: string
    created_at: string
  } // 미리보기 문서 내용
  isActive?: boolean
}

// 개별 미리보기 문서 스타일
const PreviewContent = styled.div<{ isDarkMode: boolean; color: string }>`
  width: 100%;
  height: 8rem;
  background-color: ${(props) => props.color};
  display: flex;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-family: 'Inter';
  line-height: 1.5;
  transition: ease 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;

  // 호버시 확장
  &:hover {
    transform: translate(-3px, -3px);
    transition: ease 0.3s;
  }
`
const PreviewContentFloor = styled.div<{ color: string }>`
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 8rem;
  /* background-color: hsl(${(props) => props.color}); */
  background-color: currentColor;
  border-radius: 1rem;
`

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ content }) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  return (
    <PreviewContentFloor color={content.color}>
      <PreviewContent isDarkMode={isDarkMode} color={content.color}>
        {content.title}
      </PreviewContent>
    </PreviewContentFloor>
  )
}

export default GalleryPreview
