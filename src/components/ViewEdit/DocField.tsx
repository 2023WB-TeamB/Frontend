import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
  useEditorModeStore,
  useDocContentStore,
  useDocTagStore,
  useDocIdStore,
  useApiUrlStore,
  useDarkModeStore,
  useSidePeekStore,
  useEditorObjectStore,
} from '../../store/store'
import EditIcon from '../../assets/images/Viewer/edit.svg'
import SaveIcon from '../../assets/images/Viewer/save.svg'
import CancelIcon from '../../assets/images/Viewer/cancel.svg'
import EditorArea from './EditorComps/WYSIWYG_Area'
import DocTags from './DocTags'
import FixedMenubar from './EditorComps/FixedMenubar'

// ? 문서 전체 폼
const ViewerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 80vw;
  height: 88vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  transition: ease-in-out 0.3s;
`

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
`

const IconButton = styled.button`
  margin: 5px;
  padding: 0px;
  width: 2.7rem;
  height: 2.7rem;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-inline: 1px solid #555;
  border-radius: .5rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`

const EditMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const DistributeContentWrappe = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  transition: ease .2s;
`

// ? 문서 제목 내용 구분선
const DistributeDiv = styled.div<{ isDarkMode: boolean }>`
  width: 90%;
  padding-block-start: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & span {
    width: 100%;
    min-height: 1px;
    background: ${(props) => props.isDarkMode ? '#555' : '#ccc'};
  }
`

// ? 문서 내용 폼
const ViewArea = styled.div`
  width: 90%;
  min-height: 450px;
  max-height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
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
  max-width: ${(props) => (props.isOpenSideAlways ? '75vw' : '85vw')};
  height: 4rem;
  text-align: left;
  display: flex;
  align-items: center;

  & h2,
  & textarea {
    margin: 0;
    padding-inline: 0;
    padding-block: 5px;
    font-size: 2.5rem;
    border: none;
    outline: none;
    background-color: transparent;
    font-family: Inter;
    font-weight: 600;
    color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
    resize: none;
    width: 100%;
    box-sizing: border-box;
    line-height: 1;
    height: 3.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: inter;
  }
`

const DocField: React.FC = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { isOpenSideAlways } = useSidePeekStore()
  const { apiUrl } = useApiUrlStore()
  const { title, content, setTitle, setContent, setColor } = useDocContentStore()
  const { tags, setTag, addTag } = useDocTagStore()
  const { docId } = useDocIdStore()
  const { editor, setEditor } = useEditorObjectStore()

  // * Toast 알림창
  const ToastInfor = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 1800,
  })

  // ? 문서 조회 API
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
    return () => {
      setContent('')
      setEditor(null)
    }
  }, [docId])

  const { isEditor, toggleEditorMode } = useEditorModeStore()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }

  // ? 문서 수정 API
  const handleSaveDocContent = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      await axios.put(
        `${apiUrl}/${docId}`,
        {
          title,
          content,
          keywords: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      ToastInfor.fire({
        icon: 'success',
        title: 'Document Save Successful',
      })
      return true
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
      ToastInfor.fire({
        icon: 'error',
        title: 'Document Save Failed',
      })
      return false
    }
  }

  const saveDoc = async () => {
    // 저장 성공시 뷰어로 전환
    await handleSaveDocContent()
    toggleEditorMode()
  }

  const unsaveDoc = async () => {
    // 저장 취소 시 문서 정보 다시 가져오며 뷰어로 전환
    setContent('')
    setEditor(null)
    await handleGetDoc()
    toggleEditorMode()
  }

  return (
    <ViewerWrapper id="DocField">
      <TitleArea isDarkMode={isDarkMode} isOpenSideAlways={isOpenSideAlways}>
        {isEditor ? <textarea value={title} onChange={handleChange} /> : <h2>{title}</h2>}
      </TitleArea>
      <DistributeDiv isDarkMode={isDarkMode}>
        <DocTags />
        {isEditor || <span />}
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
          {isEditor && 
          <EditMenuWrapper>
            {editor &&
              <FixedMenubar editor={editor} />
            }
          </EditMenuWrapper>
          }
        </DistributeContentWrappe>
      </DistributeDiv>
      <ViewArea>
        {content && <EditorArea />}
      </ViewArea>
    </ViewerWrapper>
  )
}

export default DocField
