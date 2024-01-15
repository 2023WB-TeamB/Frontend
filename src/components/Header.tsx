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
import imgSignIn from '../assets/images/signin.svg'
import imgSignInDark from '../assets/images/signin_dark.svg'
import imgSignOut from '../assets/images/signout.svg'
import imgSignOutDark from '../assets/images/signout_dark.svg'

/*** 스타일링 ***/
const Layout = styled.div<LayoutProps>`
  // 스타일 크기
  height: 40px;
  width: 100%;
  // 스타일 위치
  position: fixed;
  top: 0;
  left: 0;
  // 조건부로 다크모드 지정, props로 값을 받아옴
  background-color: ${(props) => (props.isDarkMode ? '#202020' : '#fff')};
  z-index: 5;
`
const Icon = styled.img<IconProps>`
  // 스타일 크기, props로 값을 받아옴
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  // 스타일 위치
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};

  cursor: pointer;
`
/***  인터페이스 ***/
interface HeaderProps {
  isLogin: boolean
}
interface IconProps {
  height: string
  width: string
  top?: string
  left?: string
  right?: string
}
interface LayoutProps {
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
    const response = await axios.delete('http://gtd.kro.kr:8000/api/v1/auth/')
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
      <Layout isDarkMode={isDarkMode}>
        {/* 로고 아이콘 */}
        <Icon src={imgLogo} height="30px" width="30px" top="5px" left="15px" alt="Logo Icon" />
        {/* 로그인 또는 로그아웃 아이콘 */}
        {isLogin ? (
          // 로그아웃
          <Icon
            src={isDarkMode ? imgSignOutDark : imgSignOut}
            height="15px"
            width="60px"
            top="12px"
            right="80px"
            alt="SignOut Icon"
            onClick={handleClickSignout}
          />
        ) : (
          // 로그인
          <Icon
            src={isDarkMode ? imgSignInDark : imgSignIn}
            height="15px"
            width="50px"
            top="12px"
            right="80px"
            alt="SignIn Icon"
            onClick={handleClickSignin} // Signin 클릭하면 로그인 모달 오픈
          />
        )}
        {/* 다크모드 아이콘 */}
        <Icon
          src={isDarkMode ? imgWhiteMode : imgDarkMode}
          height="30px"
          width="30px"
          top="5px"
          right="15px"
          alt="DarkMode Icon"
          onClick={handleDarkMode}
        />
      </Layout>
      {/* 로그인 모달 */}
      {isSigninOpen && <Signin />}
    </>
  )
}

export default Header
