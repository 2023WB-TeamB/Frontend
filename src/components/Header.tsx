import styled from 'styled-components'
import imgDrakMode from '../assets/images/dark_mode.png'
import imgWhiteMode from '../assets/images/white_mode.png'
import imgLogo from '../assets/images/LOGO1.png'
import imgSignIn from '../assets/images/signin.png'
import imgSignInDark from '../assets/images/signin_dark.png'
import { useState } from 'react'

/*** Header 타입 지정을 위한 인터페이스 ***/
interface LayoutProps {
  isDarkMode: boolean
}
interface IconProps {
  height: string
  width: string
  top?: string
  left?: string
  right?: string
}
/*** 스타일링 ***/
const Layout = styled.div<LayoutProps>`
  // 스타일 크기
  height: 40px;
  width: 100%;
  // 스타일 위치
  position: fixed;
  top: 0;
  left: 0;
  margin-bottom: 0;
  // 조건부로 다크모드 지정, props로 값을 받아옴
  background-color: ${(props) => (props.isDarkMode ? '#000' : '#fff')};
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

/*** 메인 ***/
const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleLogo = () => {
    // 로고 클릭 시에 필요한 이벤트 처리
  }

  const handleSignIn = () => {
    // 로그인 아이콘 클릭 시에 필요한 이벤트 처리
  }

  const handleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev) // 다크모드 상태를 토글
    // prev : 이전 요소의 값
  }

  return (
    <Layout isDarkMode={isDarkMode}>
      {/* 로고 아이콘 */}
      <Icon src={imgLogo} height="30px" width="30px" top="5px" left="15px" alt="Logo Icon" />

      {/* 로그인 아이콘 */}
      <Icon
        src={isDarkMode ? imgSignInDark : imgSignIn}
        height="15px"
        width="50px"
        top="12px"
        right="80px"
        alt="Logo Icon"
      />

      {/* 다크모드 아이콘 */}
      <Icon
        src={isDarkMode ? imgWhiteMode : imgDrakMode}
        height="30px"
        width="30px"
        top="5px"
        right="15px"
        alt="Logo Icon"
        onClick={handleDarkMode}
      />
    </Layout>
  )
}

export default Header
