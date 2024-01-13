import { GlobalStyle } from '../GlobalStyle'
import React, { useState } from 'react'
import styled from 'styled-components'
import Signin from '../components/Signin.tsx'
// import Register from '../components/Register'
import Header from '../components/Header'
import { Page3 } from '../components/MainPage/page3'
import { Page4 } from '../components/MainPage/page4'
import { Page5 } from '../components/MainPage/page5'
import { Page2 } from '../components/MainPage/page2'
import { useDarkModeStore } from '../store/store'

/* 각 페이지에 대한 설정 */
export const Container = styled.div<{ isDarkMode: boolean }>`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
`

interface SectionProps {
  marginTop?: string
}
const Section = styled.div<SectionProps>`
  position: relative;
  width: 100vw;
  height: 100vh;
  margin-top: ${(props) => props.marginTop || '15rem'};
`

//Logo
const Main = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  font-family: 'DMSerifDisplay', serif;
  color: transparent;
  background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
  -webkit-background-clip: text;
  position: absolute;
  top: 17%;
  left: 50%;
  transform: translateX(-50%);
`
const Smalli = styled.span`
  font-size: 7rem;
`

//Join us 부분
export const Sub = styled.h1<{ isDarkMode: boolean }>`
  font-size: 1.2rem;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`

//InputBox
const InputBoxWrapper = styled.div`
  position: absolute;
  width: 40.39rem;
  top: 53%;
  left: 50%;
  transform: translateX(-50%);
  &:before {
    content: '';
    position: absolute;
    top: -0.063rem;
    left: -0.063rem;
    bottom: -0.063rem;
    right: -0.063rem;
    background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
    border-radius: 4.09rem;
    z-index: -1;
  }
`
const InputBox = styled.input<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  border: solid 0.063rem transparent;
  border-radius: 4.09rem;
  box-shadow: 0.125rem 0.25rem 0.3125rem #0000001a;
  height: 3.5rem;
  width: 40rem;
  text-align: center;
  font-size: 1.3rem;
  color: ${(props) => (props.isDarkMode ? 'white' : '#1a1a1a')};
`

/*** Publishing ***/
const MainPage: React.FC = () => {
  // const [isRegisterOpen, setIsRegisterOpen] = useState(false) // 회원가입 모달 상태
  const [isSigninOpen, setIsSigninOpen] = useState(false) // 로그인 모달 상태
  const isLogin: boolean = false // 기본값은 로그아웃 상태
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  // 로그인 핸들러
  const handleSigninOpen = () => {
    setIsSigninOpen(true)
  }
  const handleSigninClose = () => {
    setIsSigninOpen(false)
  }

  /**InputBox -> Enter -> Register모달**/
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSigninOpen()
    }
  }

  return (
    <>
      <GlobalStyle />
      <Container isDarkMode={isDarkMode}>
        <Header isLogin={isLogin} />
        <Section marginTop="0rem">
          <Main>
            G<Smalli>i</Smalli>ToDoc
          </Main>
          <Sub isDarkMode={isDarkMode}>Join us to change github repository to file!</Sub>
          <InputBoxWrapper>
            <InputBox isDarkMode={isDarkMode} type="text" onKeyDown={handleEnter} />
          </InputBoxWrapper>
        </Section>
        <Section marginTop="5rem">
          <Page2 />
        </Section>
        <Section>
          <Page3 />
        </Section>
        <Section>
          <Page4 />
        </Section>
        <Section>
          <Page5 />
        </Section>
      </Container>
      {/* 모달의 오버레이가 겹쳐서 컨테이너 밖으로 코드를 이동했습니다 -희수- */}
      {isSigninOpen && <Signin onClose={handleSigninClose} />}
    </>
  )
}

export default MainPage

//<h1>GiToDoc</h1>
//<p>Join us to change github repository to file!</p>
//{/* Resister 모달을 띄우기 위한 임시 버튼 */}
//<button onClick={handleRegisterOpen}>회원가입</button>
//<Register isOpen={isRegisterOpen} onClose={handleRegisterClose} />
//{/* Signin 모달을 띄우기 위한 임시 버튼 */}
//<button onClick={handleSigninOpen}>로그인</button>
//<Signin isOpen={isSigninOpen} onClose={handleSigninClose} />
