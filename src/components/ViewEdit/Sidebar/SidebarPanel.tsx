import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import VersionPreviewTile from './VersionPreviewArea'
import searchIcon from '../../../assets/images/search.png'
import searchIcon_dark from '../../../assets/images/search_dark.svg'
import closeIcon from '../../../assets/images/Viewer/closeIcon.svg'
import closeIcon_dark from '../../../assets/images/Viewer/closeIcon_dark.svg'
import {
  useApiUrlStore,
  useDarkModeStore,
  useSidePanelSearchStore,
  useSidePeekStore,
  useViewerPageOpenStore,
} from '../../../store/store'
import axios from 'axios'
import GalleryPreviewTile from './GalleryPreviewArea'
import useDebounce from '../../useDebounce'

// 확장 패널 스타일
const StyledSidebarPanel = styled.div<{
  isOpenSidePanel: boolean
  isDarkMode: boolean
  isOpenSideAlways: boolean
}>`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-right: 0.8px solid ${(props) => (props.isDarkMode ? '#484848' : '#c8c8c8')};
  background-color: ${(props) => (props.isDarkMode ? '#292929' : '#f0f0f0')};
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
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
`

// 검색 영역 스타일
const SearchArea = styled.div<{ isDarkMode: boolean }>`
  width: 80%;
  height: 40px;
  border: 1px solid ${(props) => (props.isDarkMode ? '#c8c8c8' : '#5e5e5e')};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  input {
    padding: 15px 0 15px 15px;
    width: 85%;
    background: transparent;
    border: none;
    border-radius: 30px;
    font-size: 1em;
    color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
    font-family: 'Inter';

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
  margin: 22px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export interface projectData {
  id: number
  repo?: string
  title: string
  color: string
  created_at: string
  keywords: string[]
}

// 사이드바 확장 패널
const SidebarPanel: React.FC = () => {
  const { apiUrl } = useApiUrlStore()
  const { isOpenGalleryPanel, isOpenVersionPanel, closeSidePanel } = useViewerPageOpenStore()
  const { isOpenSideAlways } = useSidePeekStore()
  const [myDocsData, setMyDocsData] = useState<Array<[string, projectData[]]>>([])
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const isOpenSidePanel = isOpenGalleryPanel || isOpenVersionPanel

  //* 검색 관련 state
  const [query, setQuery] = useState('') // 검색 키워드 상태관리
  const debouncedQuery = useDebounce(query, 500)
  const { searchTemp, setSearchTemp } = useSidePanelSearchStore()

  const searchBarRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    //* 검색 콜백 함수
    const getData = () => {
      setSearchTemp(
        myDocsData
          .flatMap(([repo, data]) => {
            return data.map((d) => ({ ...d, repo }))
          })
          .filter((doc) => {
            const lowerCaseQuery = query.toLowerCase() // 입력을 소문자로
            const repo = doc.repo.toLowerCase().includes(lowerCaseQuery)
            const title = doc.title.toLowerCase().includes(lowerCaseQuery)

            return (isOpenVersionPanel && repo) || title
          }),
      )
    }
    getData()
  }, [debouncedQuery]) // 디바운스로 의존성 주입

  //* 버전 관리의 상태가 변하면 query 초기화
  useEffect(() => {
    setQuery('')
  }, [isOpenGalleryPanel])

  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }

  //? 문서 조회 API
  const handleGetDocVersions = async () => {
    try {
      // API 호출, 액세스 토큰
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/version`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      setMyDocsData(Object.entries(response.data.data))
    } catch (error: any) {
      // API 호출 실패
      console.error('API Error :', error)
    }
  }

  useEffect(() => {
    handleGetDocVersions()
  }, [])

  //* 최초 렌더링 검색 결과 공백 방지
  useEffect(() => {
    setSearchTemp(myDocsData.flatMap(([repo, data]) => data.map((d) => ({ ...d, repo }))))
  }, [myDocsData])

  const sidePanelStyle = {
    minWidth: isOpenSidePanel ? '28rem' : '0',
    width: isOpenSidePanel ? '28rem' : isOpenSideAlways ? '6rem' : '0',
    right: isOpenSidePanel ? '0' : '100%',
  }

  return (
    <StyledSidebarPanel
      style={sidePanelStyle}
      isOpenSidePanel={isOpenSidePanel}
      isDarkMode={isDarkMode}
      isOpenSideAlways={isOpenSideAlways}>
      <SidePanelTopWrapper>
        <SearchArea isDarkMode={isDarkMode}>
          <input
            ref={searchBarRef}
            onChange={getValue}
            value={query}
            placeholder={
              isOpenVersionPanel ? 'Search your repository...' : 'Search your project...'
            }
          />
          <img
            src={isDarkMode ? searchIcon_dark : searchIcon}
            style={{ margin: 10, width: 25 }}></img>
        </SearchArea>
        <StyledCloseButton onClick={closeSidePanel}>
          <img src={isDarkMode ? closeIcon_dark : closeIcon} style={{ width: 40 }} />
        </StyledCloseButton>
      </SidePanelTopWrapper>
      {isOpenGalleryPanel && (
        <PreviewTileWrapper isDarkMode={isDarkMode}>
          {myDocsData.length > 0 &&
            myDocsData.map((item) => {
              const [projectTitle, _] = item
              const filteredSearchTemp = searchTemp.filter((doc) => doc.repo === projectTitle)
              return (
                filteredSearchTemp.length > 0 && (
                  <GalleryPreviewTile title={projectTitle} pages={filteredSearchTemp} />
                )
              )
            })}
        </PreviewTileWrapper>
      )}
      {isOpenVersionPanel && (
        <PreviewTileWrapper isDarkMode={isDarkMode}>
          {myDocsData.length > 0 &&
            myDocsData.map((item) => {
              const [projectTitle, _] = item
              const filteredSearchTemp = searchTemp.filter((doc) => doc.repo === projectTitle)
              return (
                filteredSearchTemp.length > 0 && (
                  <VersionPreviewTile title={projectTitle} pages={filteredSearchTemp} />
                )
              )
            })}
        </PreviewTileWrapper>
      )}
    </StyledSidebarPanel>
  )
}

export default SidebarPanel
