import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDarkModeStore } from '../store/store'
import axios from 'axios'
/*-----------------------------------------------------------*/
import Signin from './Signin'
import useModalStore from './useModalStore'
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
  padding: 5px 20px 0 20px;
  // 조건부로 다크모드 지정, props로 값을 받아옴
  background-color: ${(props) => (props.isDarkMode ? '#202020' : '#fff')};
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
  border-radius: 20px;
  padding: 0 5px 0 0;
  margin-right: 15px;
`

const Search = styled.input<SearchProps>`
  width: 13rem;
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

  &:hover {
    border-radius: 15px;
    background-color: #2b2b2b;
    background: ${(props) => (props.isDarkMode ? '#2b2b2b' : '#F5F5F5')};
  }
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
  isDarkMode: boolean
}
/*** 메인 ***/
const Header = ({ isLogin }: HeaderProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore()
  const { isSigninOpen, toggleSignin } = useModalStore()
  const navigate = useNavigate()

  const handleClickSignin = () => {
    toggleSignin() // 로그인 open/close 토글
  }

  const handleDarkMode = () => {
    // 다크모드 토글
    toggleDarkMode() // prev: 이전 요소의 값, 다크모드 상태를 토글
  }

  const handleClickSignout = async () => {
    // 로그아웃 API 호출
    const response = await axios.delete('https://gtd.kro.kr/api/v1/auth/')
    // 로그아웃 성공 시
    if (response.status === 202) {
      console.log('API Response: ', response.status)
      alert('로그아웃 성공!')
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
          <SearchWrapper isDarkMode={isDarkMode}>
            <Search isDarkMode={isDarkMode} />
            <Icon
              isDarkMode={isDarkMode}
              src={isDarkMode ? imgSearchDark : imgSearch}
              height="2rem"
              width="2rem"
              // onClick={}
            />
          </SearchWrapper>
          <Icon
            isDarkMode={isDarkMode}
            src={isDarkMode ? imgWhiteMode : imgDarkMode}
            height="2rem"
            width="2rem"
            onClick={handleDarkMode}
          />
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
      {/* 로그인 모달 */}
      {isSigninOpen && <Signin />}
    </>
  )
}

export default Header
