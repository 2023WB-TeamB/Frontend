import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDarkModeStore } from '../store/store'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
/*----------------------------------------------------------*/
import Signin from './Signin'
import useModalStore from './useModalStore'
import SearchList from './SearchList'
/*-----------------------------------------------------------*/
import imgDarkMode from '../assets/images/dark_mode.svg'
import imgWhiteMode from '../assets/images/white_mode.svg'
import imgLogo from '../assets/images/LOGO1.svg'
import imgSearch from '../assets/images/search.svg'
import imgSearchDark from '../assets/images/search_dark.svg'

/*** 스타일링 ***/
const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: ${(props) => (props.isDarkMode ? '#202020' : '#fff')};
  padding: 0 30px 0 10px;
`
const Logo = styled.img`
  width: 2rem;
  height: 2rem;
`
const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const SearchWrapper = styled.div<SearchProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isDarkMode ? '#2b2b2b' : '#F5F5F5')};
  border-radius: 10px;
  padding: 0 5px 0 0;
  margin-right: 15px;
`

const Search = styled.input<SearchProps>`
  width: 20.5rem;
  height: 40px;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  background-color: ${(props) => (props.isDarkMode ? '#2b2b2b' : '#F5F5F5')};
  color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
  outline: none;
  margin-left: 20px;
`
const Icon = styled.img<IconProps>`
  display: flex;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding: 5px;
  cursor: pointer;

  &:hover {
    border-radius: 50%;
    background: ${(props) => (props.isDarkMode ? '#2b2b2b' : '#F5F5F5')};
  }
`
const SignInOut = styled.div<SingProps>`
  font-size: 1.6rem;
  color: ${(props) => (props.isDarkMode ? 'white' : '#C8C8C8')};
  margin-left: 15px;
  align-self: flex-start;
  cursor: pointer;

  /* &:hover {
    border-radius: 15px;
    background-color: #2b2b2b;
    background: ${(props) => (props.isDarkMode ? '#2b2b2b' : '#F5F5F5')};
  } */
`
/***  인터페이스 ***/
interface HeaderProps {
  isLogin: boolean
}
interface IconProps {
  height: string
  width: string
  isDarkMode?: boolean
}
interface ContainerProps {
  isDarkMode: boolean
}
interface SingProps {
  isDarkMode: boolean
}
interface SearchProps {
  isDarkMode?: boolean
}
export interface searchProps {
  docs_id: number
  title: string
  updated_at: string
  keywords: [name: any]
}

const Header = ({ isLogin }: HeaderProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore()
  const { isSigninOpen, toggleSignin, isSearchListOpen, toggleSearchList } = useModalStore()
  const [search, setSearch] = useState<string>('') // 검색 키워드 상태관리
  const [searchedData, setSearchedData] = useState<searchProps[]>([]) // 초기값은 undefined로 설정하거나, 필요에 따라 초기값을 지정하세요.
  const navigate = useNavigate()

  const getSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value) // search 상태관리
  }
  const handleClickSignin = () => {
    toggleSignin() // 로그인 open/close 토글
  }
  const handleDarkMode = () => {
    toggleDarkMode() // prev: 이전 요소의 값, 다크모드 상태를 토글
  }

  const handelClickSearch = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (search === '') return 0
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.post(
        `https://gtd.kro.kr/api/v1/docs/search/`,
        {
          query: `${search}`, // 검색하고자할 키워드, 제목의 일부
        },
        { headers: { Authorization: `Bearer ${access}` } }, // 헤더에 access토큰 추가
      )
      if (response.status === 200) {
        toggleSearchList() // 검색리스트 토글
        setSearchedData(response.data.data) // 검색한 문서의 정보, 배열이 들어감(타이틀 날짜 키워드 등)
        console.log('API Response: ', response.status)
        console.log('API Responsed Data: ', response.data.data)
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        console.log('API Response: ', error.response.status)
        alert('검색어를 입력해 주세요')
      }
      if (error.response.status === 404) {
        console.log('API Response: ', error.response.status)
        alert('해당하는 문서가 없습니다')
      }
    }
  }

  const handleClickSignout = async () => {
    // 로그아웃 API 호출
    const response = await axios.delete('https://gtd.kro.kr/api/v1/auth/')
    // 로그아웃 성공 시
    if (response.status === 202) {
      console.log('API Response: ', response.status)
      // 로그아웃 성공 시, 로컬스토리지에서 토큰 삭제 후 메인페이지 이동
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      navigate('/') // 메인페이지로 이동
    }
  }
  return (
    <>
      <Container isDarkMode={isDarkMode}>
        <Logo src={imgLogo}></Logo>
        <RightWrapper>
          {/* 검색 */}
          <SearchWrapper isDarkMode={isDarkMode}>
            <Search type="text" value={search} onChange={getSearchData} isDarkMode={isDarkMode} />
            <Icon
              isDarkMode={isDarkMode}
              src={isDarkMode ? imgSearchDark : imgSearch}
              height="2rem"
              width="2rem"
              onClick={handelClickSearch}
            />
          </SearchWrapper>
          {/* 다크모드 */}
          <Icon
            isDarkMode={isDarkMode}
            src={isDarkMode ? imgWhiteMode : imgDarkMode}
            height="2rem"
            width="2rem"
            onClick={handleDarkMode}
          />
          {/* 로그인/로그아웃 */}
          {isLogin ? (
            <SignInOut isDarkMode={isDarkMode} onClick={handleClickSignout}>
              sign-out
            </SignInOut>
          ) : (
            <SignInOut isDarkMode={isDarkMode} onClick={handleClickSignin}>
              sign-in
            </SignInOut>
          )}
        </RightWrapper>
      </Container>
      {/* 모달 */}
      {isSearchListOpen && <SearchList searchedData={searchedData} />}
      {isSigninOpen && <Signin />}
    </>
  )
}

export default Header
