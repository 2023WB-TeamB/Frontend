import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDarkModeStore } from '../store/store'
import axios from 'axios'
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
const SignInOut = styled.div<SignProps>`
  font-size: 1.6rem;
  color: ${(props) => (props.isDarkMode ? 'white' : '#C8C8C8')};
  margin-left: 15px;
  align-self: flex-start;
  cursor: pointer;
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
interface SignProps {
  isDarkMode: boolean
}

const Header = ({ isLogin }: HeaderProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore()
  const { isSigninOpen, toggleSignin, isSearchListOpen, searchListOpen } = useModalStore()
  const navigate = useNavigate()

  const handleClickSignin = () => {
    toggleSignin() // 로그인 open/close 토글
  }
  const handleDarkMode = () => {
    toggleDarkMode() // prev: 이전 요소의 값, 다크모드 상태를 토글
  }

  const handleClickSearch = async (e: React.MouseEvent) => {
    e.preventDefault()
    searchListOpen()
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
          <Icon
            isDarkMode={isDarkMode}
            src={isDarkMode ? imgSearchDark : imgSearch}
            height="2.4rem"
            width="2.4rem"
            onClick={handleClickSearch}
          />
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
      {isSearchListOpen && <SearchList />}
      {isSigninOpen && <Signin />}
    </>
  )
}

export default Header
