import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore, useDocIdStore } from '../../../store/store'

interface GalleryPreviewProps {
  content: {
    id: number
    repo?: string
    title: string
    color: string
    created_at: string
    keywords: Array<{ name: string }>
  }
}

// 개별 미리보기 문서 스타일
const PreviewContentWrapper = styled.div<{ $isDarkMode: boolean; color: string }>`
  margin-block: 10px;
  width: 100%;
  height: 10rem;
  background-color: ${(props) => (props.$isDarkMode ? '#222' : '#f8f8f8')};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-inline-start: 4px solid ${(props) => props.color};
  cursor: pointer;
`
const TopContent = styled.div`
  margin: 5px 5px 0px 5px;
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & label {
    width: 20rem;
    margin: 1rem;
    margin-right: 0.2rem;
    font-size: 0.8rem;
    font-weight: 700;
    text-align: left;
    color: #888;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & p {
    width: 5rem;
    margin-right: 1.5rem;
    font-size: 0.7rem;
    text-align: right;
  }
`
const TitleContent = styled.div`
  margin-left: 1.1rem;
  padding: 0.1rem;
  width: 90%;
  height: 4rem;
  line-height: 2rem;
  overflow: hidden;
  text-align: left;
  font-size: 1.35rem;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`
const TagContentWrapper = styled.div`
  position: absolute;
  bottom: 1.8rem;
  width: 100%;
  height: 1.5rem;
  margin: 0 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 0;
  flex-shrink: 0;
`
const TagContent = styled.div<{ $isDarkMode: boolean; color: string }>`
  padding: 0 0.5rem;
  margin-left: 0.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  border-radius: 2rem;
  background: ${(props) => (props.$isDarkMode ? '#282828' : '#fff')};
  color: ${(props) => props.color};
`

// 버튼형 디자인
// const PreviewContentInside = styled.div<{ $isDarkMode: boolean, color: string }>`
//   width: 98%;
//   height: 96%;
//   background-color: ${(props) => (props.color)};
//   display: flex;
//   border-radius: 1rem;
//   align-items: center;
//   justify-content: center;
//   font-size: 1rem;
//   line-height: 1.5;
//   transition: ease 0.3s;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: pre-wrap;
//   transition: ease .3s;

//   // 호버시 확장
//   &:hover {
//     transform: translate(-3px, -3px);
//     box-shadow: 3px 3px 1px;
//     transition: transform ease 0.5s, box-shadow ease 0.5s;
//   }

//   &:active {
//     transform: translate(0);
//     box-shadow: 3px 3px 2px inset;
//     transition: transform ease-out .1s, box-shadow ease-out .2s;
//   }
// `
// const PreviewContentOutside = styled.div<{ color: string }>`
//   position: relative;
//   margin: 10px 0;
//   width: 17rem;
//   height: 10rem;
//   background-color: white;
//   border: 3px solid ${(props) => props.color};
//   border-radius: 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ content }) => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const { setDocId } = useDocIdStore()

  const handlePreviewDoc = () => {
    setDocId(content.id)
  }

  return (
    <PreviewContentWrapper
      $isDarkMode={$isDarkMode}
      color={content.color}
      onClick={handlePreviewDoc}>
      <TopContent>
        <label htmlFor="repoInput">{content.repo}</label>
        <p>{content.created_at}</p>
      </TopContent>
      <TitleContent>{content.title}</TitleContent>
      <TagContentWrapper>
        {content.keywords.length > 0 &&
          content.keywords.map((item) => {
            return (
              <TagContent $isDarkMode={$isDarkMode} color={content.color}>
                {item.name}
              </TagContent>
            )
          })}
      </TagContentWrapper>
    </PreviewContentWrapper>
  )
}

export default GalleryPreview
