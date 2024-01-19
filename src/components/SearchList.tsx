import React, { ChangeEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
/*-----------------------------------------------------------*/
import SearchItem from './SearchItem'
import { useModalStore } from './useModalStore'
/*-----------------------------------------------------------*/
import imgSearch from '../assets/images/search.svg'
import imgClose from '../assets/images/close.png'

interface IconProps {
  height: string
  width: string
  isDarkMode?: boolean
  onClick?: () => void
}
export interface searchProps {
  id: number
  title: string
  created_at: string
  color: string
  keywords: [name: any]
}
/**** 스타일 ****/
const Overlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: black;
  border-radius: 20px;
  height: 450px;
  width: 50rem;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 10px 0;
  z-index: 5;
`
const Icon = styled.img<IconProps>`
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
const SearchBar = styled.input`
  width: 44rem;
  height: 40px;
  font-size: 1.2rem;
  border: none;
  outline: none;
  background-color: transparent;
  color: black;
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
`
const SearchList: React.FC = () => {
  const { searchListClose } = useModalStore()
  const [search, setSearch] = useState<string>('') // 검색 키워드 상태관리
  const [searchedData, setSearchedData] = useState<searchProps[]>([]) // 초기값은 undefined로 설정하거나, 필요에 따라 초기값을 지정하세요.

  const getSearchData = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const temp = e.target.value
      setSearch(temp)
      const access = localStorage.getItem('accessToken')
      const response = await axios.post(
        `https://gtd.kro.kr/api/v1/docs/search/`,
        {
          query: `${search}`, // 검색하고자할 키워드, 제목의 일부
        },
        { headers: { Authorization: `Bearer ${access}` } }, // 헤더에 access토큰 추가
      )
      if (response.status === 200) {
        setSearchedData(response.data.data) // 검색한 문서의 정보, 배열이 들어감(타이틀 날짜 키워드 등)
        console.log('API Response: ', response.status)
        console.log('API Responsed Data: ', response.data)
      }
    },
    [search],
  )
  // 검색내용 삭제
  const handleOnClick = () => {
    setSearch('')
  }

  return (
    <Overlay>
      <Container>
        <SearchWrapper>
          <Icon src={imgSearch} height="2rem" width="2rem" />
          <SearchBar
            onChange={getSearchData}
            value={search}
            placeholder="Search your document..."
          />
          <Icon src={imgClose} height="1rem" width="1rem" onClick={handleOnClick} />
        </SearchWrapper>
        <Divider />
        <ItemWrapper>{search && <SearchItem searchedData={searchedData} />}</ItemWrapper>
      </Container>
    </Overlay>
  )
}

export default SearchList
