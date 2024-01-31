import styled from "styled-components";
import { useDarkModeStore, useDocContentStore } from "../../store/store";

const ExternalAreaWrapper = styled.div<{ $isDarkMode: boolean }>`
    position: fixed;
    top: 0;
    padding-block: 8rem;
    padding-inline: 8rem;
    width: 1280px;
    height: max-content;
    background: ${(props) => props.$isDarkMode ? '#222' : '#fff'};
    z-index: -1;
`

const ViewerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 80vw;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  transition: ease-in-out 0.3s;
`

// ? 문서 제목 내용 구분선
const DistributeDiv = styled.div<{ $isDarkMode: boolean }>`
  width: 102%;
  padding-block-start: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & span {
    width: 100%;
    min-height: 1px;
    background: ${(props) => props.$isDarkMode ? '#555' : '#ccc'};
  }
`

// ? 문서 내용 폼
const ViewArea = styled.div`
  width: 100%;
  overflow: visible;
`

const TitleArea = styled.div<{ $isDarkMode: boolean }>`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;

  & h2 {
    margin: 0;
    padding-inline: 0;
    padding-top: 0;
    padding-bottom: .5rem;
    font-size: 2.3rem;
    border: none;
    outline: none;
    background-color: transparent;
    font-family: Inter;
    font-weight: 600;
    color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
    resize: none;
    width: 100%;
    box-sizing: border-box;
    line-height: 3.2rem;
    overflow: hidden;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: horizontal;
    text-overflow: ellipsis;
    white-space: pre-wrap;
  }
`

const ExternalArea: React.FC = () => {
    const { $isDarkMode } = useDarkModeStore()
    const { title, content } = useDocContentStore()

    return (
        <ExternalAreaWrapper id="ExternalArea" $isDarkMode={$isDarkMode}>
            <ViewerWrapper>
                <TitleArea $isDarkMode={$isDarkMode}>
                    <h1>{title}</h1>
                </TitleArea>
                <DistributeDiv $isDarkMode={$isDarkMode}>
                    <span />
                </DistributeDiv>
                <ViewArea>
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{ __html:content }}/>
                </ViewArea>
            </ViewerWrapper>
        </ExternalAreaWrapper>
    )
}

export default ExternalArea