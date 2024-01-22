import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import VersionPreviewTile from './VersionPreviewArea'
import searchIcon from '../../../assets/images/search.png'
import searchIcon_dark from '../../../assets/images/search_dark.svg'
import closeIcon from '../../../assets/images/Viewer/closeIcon.png'
import { useDarkModeStore, useSidePeekStore, useViewerPageOpenStore } from '../../../store/store'
import axios from 'axios'
import GalleryPreviewTile from './GalleryPreviewArea'

// 확장 패널 스타일
const StyledSidebarPanel = styled.div<{ isOpenSidePanel: boolean; isDarkMode: boolean; isOpenSideAlways: boolean; }>`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${(props) => (props.isDarkMode ? '#252525' : '#f0f0f0')};
  transition: ease-in-out 0.3s;
`

// 미리보기 타일 묶음
const PreviewTileWrapper = styled.div<{ isDarkMode: boolean }>`
  margin-top: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 85%;
  overflow-y: auto;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
`

// 검색 영역 스타일
const SearchArea = styled.div<{ isDarkMode: boolean }>`
  width: 80%;
  height: 40px;
  border: 1px solid ${(props) => (props.isDarkMode ? 'white' : 'black')};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  input {
    padding: 12px;
    width: 85%;
    background: transparent;
    border: none;
    border-radius: 30px;
    font-size: 1em;
    color: ${(props) => (props.isDarkMode ? 'white' : 'black')};

    &:focus {
      outline: none;
    }
  }
`

//* 패널 닫기 버튼
const StyledCloseButton = styled.button`
  width: 40px;
  height: 40px;
  background: transparent no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`

//* 패널 상단 집합
const SidePanelTopWrapper = styled.div`
  width: 70%;
  margin: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export interface projectData {
  id: number
  title: string
  color: string
  created_at: string
}

//! 임시 데이터
const tempData: Array<[string, projectData[]]> = [
  [
    "Project GTD",
    [
      {
        id: 1,
        title: "프로젝트 1",
        color: "#55EE88",
        created_at: "2022-01-01",
      },
      {
        id: 2,
        title: "프로젝트 2",
        color: "#00FF00",
        created_at: "2022-01-02",
      },
    ],
  ],
  [
    "Color Detector Program",
    [
      {
        id: 1,
        title: "프로젝트 1",
        color: "#AA55FF",
        created_at: "2022-01-03",
      },
      {
        id: 2,
        title: "프로젝트 2",
        color: "#0088BB",
        created_at: "2022-01-03",
      },
      {
        id: 3,
        title: "프로젝트 3",
        color: "#0000FF",
        created_at: "2022-01-03",
      },
      {
        id: 4,
        title: "프로젝트 4",
        color: "#FFFF00",
        created_at: "2022-01-04",
      },
    ],
  ],
];

// 사이드바 확장 패널
const SidebarPanel: React.FC = () => {
  const apiUrl = 'https://gtd.kro.kr/api/v1/docs/'
  const {
    isOpenGalleryPanel, 
    isOpenVersionPanel, 
    closeSidePanel
  } = useViewerPageOpenStore()
  const {isOpenSideAlways} = useSidePeekStore()
  const [myDocsData, setMyDocsData] = useState<Array<[string, projectData[]]>>([])
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const isOpenSidePanel = isOpenGalleryPanel || isOpenVersionPanel

  //? 문서 조회 API
  const handleGetDocVersions = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(
        `${apiUrl}version`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      setMyDocsData(Object.entries(response.data.data))
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
      setMyDocsData(tempData)
    }
  }

  useEffect(() => {
    handleGetDocVersions()
  }, [])

  const sidePanelStyle = {
    minWidth: isOpenSidePanel ? '28rem' : '0',
    width: isOpenSidePanel ? '28rem' : isOpenSideAlways ? '6rem' : '0',
    right: isOpenSidePanel ? '0' : '100%',
  }

  return (
    <StyledSidebarPanel style={sidePanelStyle}
      isOpenSidePanel={isOpenSidePanel} 
      isDarkMode={isDarkMode} 
      isOpenSideAlways={isOpenSideAlways}>
      <SidePanelTopWrapper>
        <SearchArea isDarkMode={isDarkMode}>
          <input></input>
          <img src={isDarkMode ? searchIcon_dark : searchIcon}></img>
        </SearchArea>
        <StyledCloseButton onClick={closeSidePanel}>
          <img src={closeIcon}/>
        </StyledCloseButton>
      </SidePanelTopWrapper>
      {isOpenGalleryPanel && 
        <PreviewTileWrapper isDarkMode={isDarkMode}>
        {myDocsData.length > 0 && myDocsData.map((item) => {
          const [projectTitle, projectData] = item
          return <GalleryPreviewTile title={projectTitle} pages={projectData}/>
        })}
        </PreviewTileWrapper>
      }
      {isOpenVersionPanel &&
        <PreviewTileWrapper isDarkMode={isDarkMode}>
        {myDocsData.length > 0 && myDocsData.map((item) => {
          const [projectTitle, projectData] = item
          return <VersionPreviewTile title={projectTitle} pages={projectData}/>
        })}
        </PreviewTileWrapper>
      }
    </StyledSidebarPanel>
  )
}

export default SidebarPanel
