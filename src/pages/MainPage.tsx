import React, { useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { GlobalStyle } from '../GlobalStyle'
import Signin from '../components/Signin.tsx'
import Header from '../components/Header'
import { Page3 } from '../components/MainPage/page3'
import { Page4 } from '../components/MainPage/page4'
import { Page5 } from '../components/MainPage/page5'
import { Page2 } from '../components/MainPage/page2'
import down_arrow from '../assets/images/MainPage/down_arrow.svg'
import { useLocalStorageStore, useModalStore } from '../components/useModalStore.tsx'
import { useDarkModeStore } from '../store/store'

/* 각 페이지에 대한 설정 */
const Container = styled.div<{ isDarkMode: boolean }>`
  width: 100vw;
  /* height: 100vh; */
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  margin: 0;
  transition: background-color ease 0.5s;
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  position: relative;
`

/* -----Wrapper----- */
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7vw;
  gap: 1rem;
`
const Arrowwrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 20vh;
  width: 20vw;
`

// Logo
const Main = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  font-family: 'DMSerifDisplay', serif;
  color: transparent;
  margin: 0;
  background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
  background-clip: text;
  -webkit-background-clip: text;

  @media (max-width: 720px) {
    font-size: 7rem;
  }
`
const Smalli = styled.span`
  font-size: 7rem;

  @media (max-width: 720px) {
    font-size: 6rem;
  }
`

// Join us 부분
export const Sub = styled.h1<{ isDarkMode: boolean }>`
  font-size: 1.2rem;
  font-weight: 400;
  /* font-family: 'Inter', sans-serif; */
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  white-space: nowrap;

  @media (max-width: 720px) {
    font-size: 1rem;
  }
`

// InputBox
const InputBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40.39rem;
  height: 3.75rem;
  background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
  border-radius: 4.09rem;

  @media (max-width: 720px) {
    width: 35.39rem;
  }
`
const InputBox = styled.input<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  border: none;
  border-radius: 4.09rem;
  box-shadow: 0.125rem 0.25rem 0.3125rem #0000001a;
  height: 3.5rem;
  width: 40rem;
  text-align: center;
  font-size: 1.3rem;
  color: ${(props) => (props.isDarkMode ? 'white' : '#1a1a1a')};
  transition: ease 0.5s;

  @media (max-width: 720px) {
    width: 35rem;
  }
`

/* ----down-arrow animation----- */
const down_down = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(1rem);
    opacity: 0;
  }
`
interface StylediconProps {
  animation: boolean
}

const Styledicon = styled.img<StylediconProps>`
  position: absolute;
  top: 130%;
  left: 40%;
  transform: translate(-50%, -50%);
  width: 2.2rem;
  height: 2.2rem;
  animation: ${(props) =>
    props.animation
      ? css`
          ${down_down} 1.2s ease-out infinite
        `
      : 'none'};
`

/* ** Publishing ** */
const MainPage: React.FC = () => {
  const { isSigninOpen, toggleSignin } = useModalStore() // 로그인 모달 상태
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { isGetToken, setisGetToken } = useLocalStorageStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null) {
      setisGetToken(true)
    } else {
      navigate('/mydocs') // 서버 접속할 때 토큰이 저장되어있다면 로그인됨으로 간주하고 mydocs로 리다이렉션
    }
  }, ['accessToken'])

  // 로그인 모달 핸들러
  const handleSigninOpen = () => {
    toggleSignin() // 로그인 open/close 토글
  }
  /* *InputBox -> Enter -> Register모달* */
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSigninOpen()
    }
  }

  return (
    <>
      <Header isGetToken={isGetToken} />
      <GlobalStyle />
      <Container isDarkMode={isDarkMode}>
        <Section>
          <LogoWrapper>
            <Main>
              G<Smalli>i</Smalli>ToDoc
            </Main>
            <Sub isDarkMode={isDarkMode}>Join us to change github repository to file!</Sub>
            <InputBoxWrapper>
              <InputBox isDarkMode={isDarkMode} type="text" onKeyDown={handleEnter} />
            </InputBoxWrapper>
          </LogoWrapper>
          <Arrowwrapper>
            <Styledicon src={down_arrow} animation alt="downarrow" />
          </Arrowwrapper>
        </Section>
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
      </Container>
      {isSigninOpen && <Signin />}
    </>
  )
}

export default MainPage
