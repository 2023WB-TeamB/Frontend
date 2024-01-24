import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore } from '../../../store/store'
import { projectData } from './SidebarPanel';

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

const VersionPreview: React.FC<VersionPreviewProps> = ({ content }) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  return <PreviewContent 
    isDarkMode={isDarkMode} 
    color={content.color}
  >{content.title}</PreviewContent>
}

export default VersionPreview
