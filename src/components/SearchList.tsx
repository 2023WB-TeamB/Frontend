import React, { ChangeEvent, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
/*-----------------------------------------------------------*/
import SearchItem from './SearchItem'
import { useModalStore, useSearchStore } from './useModalStore'
import useDebounce from './useDebounce'
import { docStore, useDarkModeStore } from '../store/store'
/*-----------------------------------------------------------*/
import imgSearch from '../assets/images/search.svg'
import imgClose from '../assets/images/close.png'
/*-----------------------------------------------------------*/

// 인터페이스
interface IconType {
  height: string
  width: string
  $isDarkMode?: boolean
  onClick?: () => void
}
// 스타일
const Overlay = styled.div<{ $isDarkMode: boolean }>`
  position: fixed;
  background-color: ${(props) => (props.$isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.2)')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5; // 재훈님과 얘기해서 수치 조정
`
const Container = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.$isDarkMode ? '#2C2C2C' : '#fff')};
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  border-radius: 20px;
  height: 450px;
  width: 50rem;
  padding: 10px 0 20px 0;
  z-index: 5;

  /* Webkit 브라우저에만 적용되는 스크롤 스타일 */
  ::-webkit-scrollbar {
    width: 12px;
  }
  /* 스크롤 영역, 바디 */
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  /* 스크롤 핸들(드래그하는 부분) */
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => (props.$isDarkMode ? '#414141' : '#f0f0f0')};
  }
`
const Icon = styled.img<IconType>`
  display: flex;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding: 5px;
  cursor: pointer;
`
const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
`
const SearchBar = styled.input<{ $isDarkMode: boolean }>`
  width: 44rem;
  height: 40px;
  font-size: 1.2rem;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  ::placeholder {
    color: #c8c8c8;
  }
`
const Divider = styled.div<{ isVisible: boolean }>`
  width: auto;
  border-top: 1px solid #c8c8c8;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`
const ItemWrapper = styled.div`
  height: 100%;
  justify-content: space-between;
  align-items: flex-start;
  overflow-x: hidden;
`
// 메인
const SearchList: React.FC = () => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const { searchListClose } = useModalStore() // 검색 모달 상태고나리
  const [query, setQuery] = useState('') // 검색어 상태관리
  const { filteredData, setFilteredData } = useSearchStore() // 필터링된 검색결과 상태관리
  const debouncedQuery = useDebounce(query, 500) // query에 대해 500ms동안의 연속된 이벤트중의 마지막을 호출한다
  const { docs } = docStore() // 변환된 문서 상태관리
  const searchBarRef = useRef<HTMLInputElement>(null) // DOM 이나 react Element 요소에 대한 참조를 생성한다

  // docs의 문서를 title, keywords로 검색
  const getDocument = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }
  // 필터링 로직
  useEffect(() => {
    const getData = () => {
      setFilteredData(
        docs.filter((doc) => {
          const lowerCaseQuery = query.toLowerCase() // 입력을 소문자로
          const title = doc.title.includes(lowerCaseQuery)
          const keywords = doc.keywords!.some((keyword) => keyword.name.includes(lowerCaseQuery))
          // keywords안의 elements를 keyword검색
          return title || keywords
        }),
      )
    }
    getData()
  }, [debouncedQuery]) // 디바운스로 연속된 이벤트에대해 의존성을 준다

  // 검색내용 삭제 이벤트
  const handleOnClick = () => {
    setQuery('')
  }
  // Overlay를 클릭한 경우 모달 close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      searchListClose()
    }
  }
  // ESC 키를 누른 경우 모달 close
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      searchListClose()
    }
  }
  // SearchBar에 focus를 주어서 ESC키 이벤트가 발생하도록 한다.
  useEffect(() => {
    if (searchBarRef.current) {
      // 참조된 DOM요소를 확인하고 존재한다면
      searchBarRef.current.focus() // 해당 요소에 focus를 둔다
    }
  }, [])

  return (
    <Overlay
      onClick={handleOverlayClick}
      tabIndex={0} // keybord의 focus를 받을수 없는 div, span 요소도 focus가 가능하게 함
      $isDarkMode={$isDarkMode}>
      <Container $isDarkMode={$isDarkMode}>
        <SearchWrapper>
          <Icon src={imgSearch} height="2rem" width="2rem" />
          <SearchBar
            ref={searchBarRef} // useRef가 참조할 요소
            onKeyDown={handleKeyPress}
            onChange={getDocument}
            value={query}
            placeholder="Search your Document..."
            $isDarkMode={$isDarkMode}
          />
          <Icon src={imgClose} height="1rem" width="1rem" onClick={handleOnClick} />
        </SearchWrapper>
        <Divider isVisible />
        <ItemWrapper>{query && <SearchItem getData={filteredData} />}</ItemWrapper>
        <Divider isVisible={false} />
      </Container>
    </Overlay>
  )
}

export default SearchList
