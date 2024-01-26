import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore, useDocIdStore } from '../../../store/store'

interface GalleryPreviewProps {
  content: {
    id: number,
    repo?: string,
    title: string,
    color: string,
    created_at: string,
    keywords: Array<{name: string}>
  }
}

// 개별 미리보기 문서 스타일
const PreviewContentWrapper = styled.div<{ isDarkMode: boolean, color: string }>`
  margin-block: 10px;
  width: 100%;
  height: 8rem;
  background-color: #e6e6e6;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-inline-start: 4px solid ${(props) => props.color};
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
    width: 16rem;
    margin: 0px 5px;
    font-size: .8rem;
    text-align: left;
    color: #777;
  }

  & p {
    width: 50%;
    margin: 0px 5px;
    font-size: .8rem;
    text-align: right;
  }
`
const TitleContent = styled.div`
  padding: 5px;
  width: 100%;
  height: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 1.5rem;
`
const TagContentWrapper = styled.div`
  width: 100%;
  height: 30%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
`
const TagContent = styled.div`
  padding: 1px 8px;
  margin-left: 5px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .7rem;
  color: #e88;
`

// 버튼형 디자인
// const PreviewContentInside = styled.div<{ isDarkMode: boolean, color: string }>`
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
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const {setDocId} = useDocIdStore()

  const handlePreviewDoc = () => {
    setDocId(content.id)
  }

  return (
    <PreviewContentWrapper 
      isDarkMode={isDarkMode} 
      color={content.color}
      onClick={handlePreviewDoc}  
    >
      <TopContent>
        <label>{content.repo}</label>
        <p>{content.created_at}</p>
      </TopContent>
      <TitleContent>
        {content.title}
      </TitleContent>
      <TagContentWrapper>
        {content.keywords.length > 0 && content.keywords.map((item) => {
          return <TagContent>{item.name}</TagContent>
        })}
      </TagContentWrapper>
    </PreviewContentWrapper>
  )
}

export default GalleryPreview
