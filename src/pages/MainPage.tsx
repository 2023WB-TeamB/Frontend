import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { GlobalStyle } from '../GlobalStyle'
import Header from '../components/Header'
import Page1 from '../components/MainPage/page1.tsx'
import { Page2 } from '../components/MainPage/page2'
import { Page3 } from '../components/MainPage/page3'
import { Page4 } from '../components/MainPage/page4'
import { Page5 } from '../components/MainPage/page5'
import { useLocalStorageStore } from '../components/ModalStore.tsx'
import { useDarkModeStore } from '../store/store'

/* 각 페이지에 대한 설정 */
const Container = styled.div<{ $isDarkMode: boolean }>`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.$isDarkMode ? '#202020' : 'white')};
  margin: 0;
  transition: background-color ease 0.5s;
  scroll-snap-type: y mandatory; // 스크롤 스냅
`
const MainPage: React.FC = () => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const { isGetToken, setisGetToken } = useLocalStorageStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null) {
      setisGetToken(true)
    } else {
      navigate('/mydocs') // 서버 접속할 때 토큰이 저장되어있다면 로그인됨으로 간주하고 mydocs로 리다이렉션
    }
  }, ['accessToken'])

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent)
    return () => window.removeEventListener('scroll', scrollEvent)
  }, [])

  const scrollEvent = () => {
    console.log('scroll Event 발생!')
  }

  return (
    <>
      <Header isGetToken={isGetToken} />
      <GlobalStyle />
      <Container $isDarkMode={$isDarkMode}>
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
      </Container>
    </>
  )
}

export default MainPage
