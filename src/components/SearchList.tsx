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

interface IconType {
  height: string
  width: string
  isDarkMode?: boolean
  onClick?: () => void
}

/**** 스타일 ****/
const Overlay = styled.div<{ isDarkMode: boolean }>`
  position: fixed;
  background-color: ${(props) => (props.isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.2)')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5; // 재훈님과 얘기해서 수치 조정
`
const Container = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isDarkMode ? '#2C2C2C' : '#fff')};
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  border-radius: 20px;
  height: 450px;
  width: 50rem;
  padding: 10px 0;
  z-index: 5;
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
`
const SearchBar = styled.input<{ isDarkMode: boolean }>`
  width: 44rem;
  height: 40px;
  font-size: 1.2rem;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  ::placeholder {
    color: #c8c8c8;
  }
`
const Divider = styled.div`
  width: 50rem;
  border-top: 1px solid #c8c8c8;
  margin: 10px 0;
`
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  overflow-x: hidden;
`

const SearchList: React.FC = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { searchListClose } = useModalStore()
  const [query, setQuery] = useState('') // 검색 키워드 상태관리
  // const [filteredData, setFilteredData] = useState<Doc[]>([])
  const { filteredData, setFilteredData } = useSearchStore()
  const debouncedQuery = useDebounce(query, 500)
  const { docs } = docStore()
  const searchBarRef = useRef<HTMLInputElement>(null) // DOM 이나 react Element 요소에 대한 참조를 생성한다

  const getValue = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }
  // 필터링 로직
  useEffect(() => {
    const getData = () => {
      setFilteredData(
        docs.filter((doc) => {
          const lowerCaseQuery = query.toLowerCase() // 입력을 소문자로
          const title = doc.title.toLowerCase().includes(lowerCaseQuery)
          const keywords = doc.keywords!.some((keyword) =>
            keyword.name.toLowerCase().includes(lowerCaseQuery),
          )
          // const tags = doc.keywords.map((keyword: Keyword) => keyword.name)

          return title || keywords
        }),
      )
    }
    getData()
  }, [debouncedQuery]) // 디바운스로 의존성을 준다

  // 검색내용 삭제
  const handleOnClick = () => {
    setQuery('')
  }
  // Overlay를 클릭한 경우에만 searchListClose 호출
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      searchListClose()
    }
  }
  // ESC 키를 누른 경우 searchListClose 호출
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
      onKeyDown={handleKeyPress}
      tabIndex={0}
      isDarkMode={isDarkMode}>
      <Container isDarkMode={isDarkMode}>
        <SearchWrapper>
          <Icon src={imgSearch} height="2rem" width="2rem" />
          <SearchBar
            ref={searchBarRef} // useRef가 참조할 요소
            onChange={getValue}
            value={query}
            placeholder="Search your itemument..."
            isDarkMode={isDarkMode}
          />
          <Icon src={imgClose} height="1rem" width="1rem" onClick={handleOnClick} />
        </SearchWrapper>
        <Divider />
        <ItemWrapper>{query && <SearchItem getData={filteredData} />}</ItemWrapper>
      </Container>
    </Overlay>
  )
}

export default SearchList
