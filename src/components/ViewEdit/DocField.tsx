import React, { useEffect } from 'react'
import {
  useEditorModeStore,
  useDocContentStore,
  useDocTagStore,
  useDocIdStore,
  useApiUrlStore,
  useDarkModeStore,
  useSidePeekStore,
} from '../../store/store'
import styled from 'styled-components'
import EditIcon from '../../assets/images/Viewer/edit.svg'
import SaveIcon from '../../assets/images/Viewer/save.svg'
import CancelIcon from '../../assets/images/Viewer/cancel.svg'
import EditorArea from './EditorComps/WYSIWYG_Area'
import DocTags from './DocTags'
import axios from 'axios'

// ? 문서 전체 폼
const ViewerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  height: 86vh;
  display: flex;  
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  transition: ease-in-out 0.3s;
`

const Icon = styled.img`
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
  justify-content: flex-end;
`

// ? 문서 제목 내용 구분선
const DistributeDiv = styled.div`
  width: 90%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & span {
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, #7cc0e8, #a565e0);
  }
`

// ? 문서 내용 폼
const ViewArea = styled.div`
  width: 85%;
  min-height: 450px;
  max-height: 70vh;
  font-family: 'Inter', sans-serif;
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
  isDarkMode: boolean
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
    margin: 2px 2px 25px 2px;
    font-size: 2.2rem;
    border: none;
    font-weight: 600;
    color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
    font-family: 'Inter', sans-serif;
    resize: none;
    width: 100%;
    box-sizing: border-box;
    line-height: 1;
    height: 2.2rem;
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
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { isOpenSideAlways } = useSidePeekStore()
  const { apiUrl } = useApiUrlStore()
  const { title, content, setTitle, setContent } = useDocContentStore()
  const { tags, setTag, addTag } = useDocTagStore()
  const { docId } = useDocIdStore()

  //? 문서 조회 API
  const handleGetDoc = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/${docId}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
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
    return () => {
      setContent("")
    }
  }, [])

  const { isEditor, toggleEditorMode } = useEditorModeStore()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }

  //? 문서 수정 API
  const handleSaveDocContent = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      await axios.put(
        `${apiUrl}/${docId}`,
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
      alert('문서가 저장되었습니다.')
      return true
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
      alert('문서 저장에 실패했습니다.')
      return false
    }
  }

  const saveDoc = async () => {
    // 저장 성공시 뷰어로 전환
    await handleSaveDocContent() && toggleEditorMode()
  }

  const unsaveDoc = async () => {
    // 저장 취소 시 문서 정보 다시 가져오며 뷰어로 전환
    setContent("")
    await handleGetDoc()
    toggleEditorMode()
  }

  return (
    <ViewerWrapper id="DocField">
      <TitleArea isDarkMode={isDarkMode} isOpenSideAlways={isOpenSideAlways}>
        {isEditor ? <textarea value={title} onChange={handleChange} /> : <h2>{title}</h2>}
      </TitleArea>
      <DistributeDiv>
        <DocTags />
        <span />
        <DistributeContentWrappe>
          <ButtonWrapper>
            {isEditor ? (
              <>
                <IconButton onClick={saveDoc}>
                  <Icon src={SaveIcon} />
                </IconButton>
                <IconButton onClick={unsaveDoc}>
                  <Icon src={CancelIcon} />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={toggleEditorMode}>
                <Icon src={EditIcon} />
              </IconButton>
            )}
          </ButtonWrapper>
        </DistributeContentWrappe>
      </DistributeDiv>
      <ViewArea>{content != '' && <EditorArea />}</ViewArea>
    </ViewerWrapper>
  )
}

export default DocField
