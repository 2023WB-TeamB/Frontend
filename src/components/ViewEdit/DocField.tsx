
import React, { useEffect } from 'react'
import { useViewerModeStore, useDocContentStore, useDocTagStore, useDocIdStore, useApiUrlStore } from '../../store/store'
import styled from 'styled-components'
import EditIcon from '../../assets/images/Viewer/edit.png'
import SaveIcon from '../../assets/images/Viewer/save.png'
import CancelIcon from '../../assets/images/Viewer/cancel.png'
import EditorArea from "./EditorComps/WYSIWYG_Area"
import DocTags from './DocTags'
import axios from 'axios'
import { marked } from 'marked'


// ? 문서 전체 폼
const ViewerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  transition: ease-in-out .3s;
`

const Icon = styled.img`
  margin: 5px;
  width: 30px;
  height: 30px;
`

const IconButton = styled.button`
  margin: 5px;
  padding: 0px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`

const DistributeContentWrappe = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

// ? 문서 제목 내용 구분선
const DistributeDiv = styled.div`
  width: 90%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & span {
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to bottom right, #76cae8, #ad51de);
  }
`

// ? 문서 내용 폼
const ViewArea = styled.div`
  margin-top: 20px;
  width: 80%;
  min-height: 450px;
  height: 100%;
  max-height: 75vh;
  font-family: 'Arial', sans-serif;
  overflow: auto;
`

// ? 문서 제목 폼
const TitleArea = styled.div`
  width: 90%;
  height: 100px;
  text-align: left;
  display: flex;
  align-items: center;

  & h2,
  & textarea {
    margin: 0%;
    font-size: 2rem;
    padding: 2px;
    border: none;
    font-weight: bold;
    color: #96C;
    font-family: 'Arial', sans-serif;
    resize: none;
    width: 100%;
    box-sizing: border-box;
    line-height: 1;
    height: 2rem;
  }

  & h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & textarea {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const DocField: React.FC = () => {
  const { apiUrl } = useApiUrlStore()
  const {title, content, setTitle, setContent} = useDocContentStore()
  const {tags, setTag, addTag} = useDocTagStore()
  const {docId} = useDocIdStore()

  //? 문서 조회 API
  const handleGetDoc = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(
        `${apiUrl}${docId}`,
        {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        },
      )
      setTitle(response.data.data.title)
      setContent(response.data.data.content)
      setTag([])
      for (const key in response.data.data.keywords) {
        addTag(response.data.data.keywords[key].name)
      }
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
    }
  }

  useEffect(() => {
    handleGetDoc()
  }, [])

  const {isViewer, toggleViewerMode} = useViewerModeStore()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }

  //* 마크다운 -> HTML
  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      setContent(await marked(content))
    }

    convertMarkdownToHtml()
  }, [content])

  //? 문서 수정 API
  const handleSaveDocContent = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      await axios.put(
        `${apiUrl}${docId}`,
        {
          title: title,
          content: content,
          keywords: tags,
        },
        {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        },
      )
      console.log('save success')
      alert("문서가 저장되었습니다.")
      return true
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
      alert("문서 저장에 실패했습니다.")
      return false
    }
  }

  
  const saveDoc = async () => {
    // 저장 성공시 뷰어로 전환
    await handleSaveDocContent() && toggleViewerMode()
  }

  const unsaveDoc = () => {
    toggleViewerMode()
  }

    return (
      <ViewerWrapper id='DocField'>
        <TitleArea>
          {isViewer ?
            <h2>{title}</h2>
            :
            <textarea value={title} onChange={handleChange}/>
          }
        </TitleArea>
        <DistributeDiv>
          <span/>
          <DistributeContentWrappe>
            <DocTags/>
            <ButtonWrapper>
              {isViewer ?
                <IconButton onClick={toggleViewerMode}>
                  <Icon src={EditIcon}/>
                </IconButton> : 
                <>
                  <IconButton onClick={saveDoc}>
                    <Icon src={SaveIcon}/>
                  </IconButton>
                  <IconButton onClick={unsaveDoc}>
                    <Icon src={CancelIcon}/>
                  </IconButton>
                </>
              }
            </ButtonWrapper>
          </DistributeContentWrappe>
        </DistributeDiv>
        <ViewArea>
          {isViewer ? 
            <p dangerouslySetInnerHTML={{__html:content}}/> : 
            <EditorArea/>
          }
        </ViewArea>
      </ViewerWrapper>
    )
}

export default DocField
