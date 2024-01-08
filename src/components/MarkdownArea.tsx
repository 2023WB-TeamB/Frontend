// 마크다운 뷰어 컴포넌트
import React, { useState } from "react"
import styled from "styled-components"
import EditIcon from "../assets/images/edit.png"
import SaveIcon from "../assets/images/save.png"
import CancelIcon from "../assets/images/cancel.png"

const ViewerWrapper = styled.div`
    min-width: 600px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DocTitle = styled.h2`
    width: 95%;
    text-align: left;
    font-size: 2em;
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
        background-image: linear-gradient(to bottom right, #76CAE8, #AD51DE);
    }
`

const ViewArea = styled.div`
    margin-top: 15px;
    width: 100%;
    max-width: 800px;
    height: 100%;
    
    & p {
        font-size: .9em;
        font-family: sans-serif;
    }

    & textarea {
        width: 100%;
        height: 70vh;
        font-size: .9em;
        font-family: sans-serif;
        border: 0;
        padding: 0;
        margin-block-start: 1em;
        margin-block-end: 1em;
        line-height: 1.5;
        font-weight: 400;
    }
`

interface MarkdownViewerProps {
    isOpenSidePanel: boolean;
}

let testText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ isOpenSidePanel }) => {
    const [isViewer, setIsViewer] = useState(false);
    
    const changeViewEditMode = () => {
        setIsViewer(!isViewer);
    }

    const sideOnStyle = {
        margin: isOpenSidePanel ? '5vh 5%' : '5vh 15%',
        width: isOpenSidePanel ? 'calc(100vw - 484px)' : 'calc(100vw - 102px)',
    };
    return (
        <ViewerWrapper style={sideOnStyle}>
            <DocTitle>Document Title</DocTitle>
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
                    </p> : <textarea>
                        {testText}
                    </textarea>
                }
            </ViewArea>
        </ViewerWrapper>
    )
}

export default MarkdownViewer