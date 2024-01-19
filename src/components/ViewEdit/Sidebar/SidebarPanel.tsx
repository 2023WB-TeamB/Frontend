import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PreviewTile from './PreviewTile'
import searchIcon from '../../../assets/images/Viewer/search.png'
import searchIcon_dark from '../../../assets/images/Viewer/search_dark.svg'
import closeIcon from '../../../assets/images/Viewer/closeIcon.png'
import { useDarkModeStore } from '../../../store/store'
import axios from 'axios'

// 확장 패널 스타일
const StyledSidebarPanel = styled.div<{ isOpenSidePanel: boolean; isDarkMode: boolean }>`
  position: fixed;
  min-width: 450px;
  min-height: 100vh;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${(props) => (props.isDarkMode ? '#252525' : '#f0f0f0')};
  z-index: 1;
  transform: translate(${({ isOpenSidePanel }) => (isOpenSidePanel ? `0%` : `-100%`)}, 0%);
  transition: ease-in-out 0.2s;
`

// 미리보기 타일 묶음
const PreviewTileWrapper = styled.div<{ isDarkMode: boolean }>`
  margin: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  width: 100%;
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
  margin: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

interface SidebarPanelProps {
  isOpenSidePanel: boolean
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface projectData {
  id: number
  title: string
  color: string
  created_at: string
}

// 사이드바 확장 패널
const SidebarPanel: React.FC<SidebarPanelProps> = ({ isOpenSidePanel, onClose }) => {
  const apiUrl = 'https://gtd.kro.kr/api/v1/docs/'
  const [myDocsData, setMyDocsData] = useState<Array<[string, projectData[]]>>([])
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  //? 문서 조회 API
  const handleGetDocVersions = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(
        `${apiUrl}version/`,
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
    }
  }

  useEffect(() => {
    handleGetDocVersions()
  }, [])

  return (
    <StyledSidebarPanel isOpenSidePanel={isOpenSidePanel} isDarkMode={isDarkMode}>
      <SidePanelTopWrapper>
        <SearchArea isDarkMode={isDarkMode}>
          <input></input>
          <img src={isDarkMode ? searchIcon_dark : searchIcon}></img>
        </SearchArea>
        <StyledCloseButton onClick={onClose}>
          <img src={closeIcon}/>
        </StyledCloseButton>
      </SidePanelTopWrapper>
      <PreviewTileWrapper isDarkMode={isDarkMode}>
      {myDocsData.length > 0 && myDocsData.map((item) => {
        const [projectTitle, projectData] = item
        return <PreviewTile title={projectTitle} pages={projectData}/>
      })}
      </PreviewTileWrapper>
    </StyledSidebarPanel>
  )
}

export default SidebarPanel
