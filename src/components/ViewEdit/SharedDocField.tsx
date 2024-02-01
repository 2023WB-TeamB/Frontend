import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
  useDocContentStore,
  useDocTagStore,
  useApiUrlStore,
  useDarkModeStore,
  useSidePeekStore,
} from '../../store/store'

import EditorArea from './EditorComps/WYSIWYG_Area'
import DocTags from './DocTags'
// ? 문서 전체 폼
const ViewerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 75vw;
  height: 86vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  transition: ease-in-out 0.3s;
`
const DistributeContentWrappe = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

// ? 문서 제목 내용 구분선
const DistributeDiv = styled.div<{ $isDarkMode: boolean }>`
  width: 90%;
  padding-block-start: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & span {
    width: 100%;
    min-height: 1px;
    background: ${(props) => (props.$isDarkMode ? '#555' : '#ccc')};
  }
`

// ? 문서 내용 폼
const ViewArea = styled.div`
  width: 85%;
  min-height: 450px;
  max-height: 70vh;
  overflow: auto;
  padding: 0 27px;

  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`

// ? 문서 제목 폼
interface TitleAreaProps {
  $isDarkMode: boolean
  isOpenSideAlways: boolean
}
const TitleArea = styled.div<TitleAreaProps>`
  width: 90%;
  max-width: ${(props) => (props.isOpenSideAlways ? '70vw' : '85vw')};
  height: 80px;
  text-align: left;
  display: flex;
  align-items: center;

  & h2,
  & textarea {
    margin: 2px 2px 20px 2px;
    padding: 2px;
    font-size: 2.2rem;
    border: none;
    outline: none;
    background-color: transparent;
    font-family: Inter;
    font-weight: 600;
    color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
    resize: none;
    width: 100%;
    box-sizing: border-box;
    line-height: 1;
    height: 2.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const SharedDocField: React.FC = () => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const { isOpenSideAlways } = useSidePeekStore()
  const { docsApiUrl } = useApiUrlStore()
  const { title, content, setTitle, setContent, setColor } = useDocContentStore()
  const { setTag, addTag } = useDocTagStore()

  const params = useParams()
  console.log(params.id)
  const handleGetDoc = async () => {
    try {
      // API 호출, 액세스 토큰
      const response = await axios.get(`${docsApiUrl}/share?uuid=${params.id}`)
      console.log(response)

      setTitle(response.data.data.title)
      setContent(response.data.data.content)
      setColor(response.data.data.color)
      setTag([])
      Object.keys(response.data.data.keywords).forEach((key) => {
        const keyword = response.data.data.keywords[key]
        addTag(keyword.name)
      })
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
    }
  }

  useEffect(() => {
    handleGetDoc()
  }, [params.id])

  return (
    <ViewerWrapper id="SharedDocField">
      <TitleArea $isDarkMode={$isDarkMode} isOpenSideAlways={isOpenSideAlways}>
        <h2>{title}</h2>
      </TitleArea>
      <DistributeDiv $isDarkMode={$isDarkMode}>
        <DocTags />
        <DistributeContentWrappe />
      </DistributeDiv>
      <ViewArea>{content && <EditorArea />}</ViewArea>
    </ViewerWrapper>
  )
}

export default SharedDocField
