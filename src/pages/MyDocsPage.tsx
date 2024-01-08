import React, { useState } from 'react'
import GiToDoc from '../components/mydocs/GiToDoc'
import styled from 'styled-components'
import { Description } from '../components/mydocs/Description'
import { Documentation } from '../components/mydocs/Documentation'
import LanguageToggle from '../components/mydocs/LanguageToggle'
import { URLInput } from '../components/mydocs/URLInput'
import RoundCarousel from '../components/mydocs/RoundCarousel'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 200vh;
  width: 100vw;
  margin: 0 auto;
  overflow: auto;
`

const MyDocsPage: React.FC = () => {
  /* 로그인 이벤트 핸들러 */
  const [isLogin, setIsLogin] = useState(true) // 기본값은 로그인이 된 상태
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLogin(false) // 로그아웃
    navigate('/') // 메인페이지로 이동
  }

  return (
    <Container>
      <Header isLogin={isLogin} onLogout={handleLogout} />
      <GiToDoc />
      <Description />
      <Documentation />
      <LanguageToggle />
      <URLInput />
      <RoundCarousel />
    </Container>
  )
}

export default MyDocsPage
