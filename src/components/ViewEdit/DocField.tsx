import React, { useState } from 'react'
import { useDarkModeStore, useViewerPageOpenStore } from '../../store/store'
import styled from 'styled-components'
import EditIcon from '../../assets/images/Viewer/edit.png'
import EidtIcon_dark from '../../assets/images/Viewer/edit_dark.svg'
import SaveIcon from '../../assets/images/Viewer/save.png'
import CancelIcon from '../../assets/images/Viewer/cancel.png'
import CancelIcon_dark from '../../assets/images/Viewer/cancel_dark.svg'
import EditorArea from "./EditorComps/WYSIWYG_Area"

// ? 문서 전체 폼
const ViewerWrapper = styled.div`
    min-width: 640px;
    width: 90vw;
    max-width: 1280px;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    transform: translateX(-20px);
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

// ? 문서 제목 내용 구분선
const DistributeDiv = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: flex-start;

  & span {
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to bottom right, #76cae8, #ad51de);
  }
`

// ? 문서 내용 폼
const ViewArea = styled.div`
    margin-top: 15px;
    width: 100%;
    max-width: 800px;
    min-height: 450px;
    height: 100%;
    font-family: 'Arial', sans-serif;
`

// ? 문서 제목 폼
const TitleArea = styled.div`
    width: 100%;
    height: 100px;
    padding: 10px;
    text-align: left;
    display: flex;
    align-items: center;

    & h2, & textarea {
        margin: 0%;
        font-size: 2rem;
        padding: 2px;
        border: none;
        font-weight: bold;
        color: #333;
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

// 임시 테스트용 데이터
const testText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

const DocField: React.FC = () => {
    const openerStore = useViewerPageOpenStore()
    const isOpenSidePanel = openerStore.isOpenGalleryPanel || openerStore.isOpenVersionPanel

    // ! 임시 제목 텍스트
    const [title, setTitle] = useState('Hello World!')
    const [isViewer, setIsViewer] = useState(true);
    
    const changeViewEditMode = () => {
        setIsViewer(!isViewer);
    }

    const sideOnStyle = {
        margin: isOpenSidePanel ? '5vh 5%' : '5vh 15%',
        left: isOpenSidePanel ? '450px' : '20px',
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    return (
        <ViewerWrapper style={sideOnStyle}>
            <TitleArea>
                {isViewer ?
                    <h2>{title}</h2>
                    :
                    <textarea value={title} onChange={handleChange}/>
                }
            </TitleArea>
            <DistributeDiv>
                <span/>
                <ButtonWrapper>
                    {isViewer ?
                        <IconButton onClick={changeViewEditMode}>
                            <Icon src={EditIcon}/>
                        </IconButton> : 
                        <>
                            <IconButton onClick={changeViewEditMode}>
                                <Icon src={SaveIcon}/>
                            </IconButton>
                            <IconButton onClick={changeViewEditMode}>
                                <Icon src={CancelIcon}/>
                            </IconButton>
                        </>
                    }
                </ButtonWrapper>
            </DistributeDiv>
            <ViewArea>
                {isViewer ? 
                    <p>
                        {testText}
                    </p> : <EditorArea />
                }
            </ViewArea>
        </ViewerWrapper>
    )
}

export default DocField