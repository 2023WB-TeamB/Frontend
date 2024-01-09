import React from "react";
import styled from "styled-components";
import PreviewTile from "./PreviewTile";
import searchIcon from "../../../assets/images/search.png";

// 확장 패널 스타일
const StyledSidebarPanel = styled.div<{ isOpenSidePanel: boolean }>`
    position: fixed;
    min-width: 450px;
    min-height: 100vh;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: #f0f0f0;
    z-index: 1;
    transform: translate(${({ isOpenSidePanel }) =>
        isOpenSidePanel ? `0%` : `-100%`}, 0%);
    transition: ease-in-out .2s;
`;

// 미리보기 타일 묶음
const PreviewTileWrapper = styled.div`
    margin: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
    width: 100%;
    overflow-y: auto;
`

// 검색 영역 스타일
const SearchArea = styled.div`
    margin: 25px;
    width: 75%;
    height: 40px;
    border: 1px solid black;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    input {
        padding: 13px;
        width: 85%;
        background: transparent;
        border: none;
        border-radius: 30px;
        font-size: 1em;

        &:focus {
            outline: none;
        }
    }

    img {

    }
`;

interface SidebarPanelProps {
    isOpenSidePanel: boolean;
    onClose?: (event:React.MouseEvent<HTMLButtonElement>) => void;
}

// 사이드바 확장 패널
const SidebarPanel: React.FC<SidebarPanelProps> = ({ isOpenSidePanel }) => {
    return (
        <StyledSidebarPanel isOpenSidePanel={isOpenSidePanel}>
            <SearchArea>
                <input></input>
                <img src={searchIcon}></img>
            </SearchArea>
            <PreviewTileWrapper>
                <PreviewTile title="Test Project" 
                    pages={["Page 1",
                            "Page 2",
                            "Page 3",
                            "Page 4",
                            "Page 5",
                            "Page 6"]}/>
                <PreviewTile title="배고프다"
                    pages={["어쩌다 나는 이렇게된 거죠",
                            "어떻게 이렇게 배고플 수 있죠",
                            "한번 무엇도 이처럼 원한 적 없죠",
                            "그립다고 천 번쯤 말해보면 닿을까요",
                            "울어보고 떼쓰면 배고픈 내 마음 알까요",
                            "그 이름 만 번쯤 미워해 볼까요",
                            "서운한 일들만 손꼽을까요",
                            "이미 허기는 너무 커져 있는데",
                            "배고픈 내가 아니니 내 맘 닿을 수 없겠죠",
                            "그래요 내가 더 많이 배고픈 거죠"]}/>
                <PreviewTile title="GiToDoc"
                    pages={["Page 1",
                            "Page 2",
                            "Page 3",
                            "Page 4",
                            "Page 5",
                            "Page 6"]}/>
                <PreviewTile title="Centauri"
                    pages={["Proxima Centauri",
                            "Alpha Centauri A",
                            "Alpha Centauri B",
                            "Rigil Kentaurus",
                            "Toliman"]}/>
                <PreviewTile title="Centauri"
                    pages={["Proxima Centauri",
                            "Alpha Centauri A",
                            "Alpha Centauri B",
                            "Rigil Kentaurus",
                            "Toliman"]}/>  
                <PreviewTile title="Centauri"
                    pages={["Proxima Centauri",
                            "Alpha Centauri A",
                            "Alpha Centauri B",
                            "Rigil Kentaurus",
                            "Toliman"]}/>       
            </PreviewTileWrapper>
        </StyledSidebarPanel>
    );
}

export default SidebarPanel