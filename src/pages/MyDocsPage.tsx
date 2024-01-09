import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import GiToDoc from '../components/mydocs/upper/GiToDoc'
import Description from '../components/mydocs/upper/Description'
import Documentation from '../components/mydocs/upper/Documentation'
import LanguageToggle from '../components/mydocs/upper/LanguageToggle'
import URLInput from '../components/mydocs/upper/URLInput'
import RoundCarousel from '../components/mydocs/upper/RoundCarousel'
import Gallery from '../components/mydocs/lower/Gallery'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`
const ScrollSnap = styled.div`
  scroll-snap-type: y mandatory;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  overflow-x: hidden;
`
// 페이지 상단부
const Upper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  scroll-snap-align: center;
  position: relative;
`
//페이지 하단부
const Lower = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  scroll-snap-align: center;
  position: relative;
`

const MyDocsPage: React.FC = () => {
  /* 로그인 이벤트 핸들러 */
  const [isLogin, setIsLogin] = useState(true) // 기본값은 로그인이 된 상태
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLogin(false) // 로그아웃
    navigate('/') // 메인페이지로 이동
  }

  /* Upper
  GiToDoc 로고 (GiToDoc)
  로고 하단 설명 (Description)
  문서화 아이콘 (Documentation)
  언어 토글 (LanguageToggle)
  URL 입력창 (URLInput)
  캐러셀 (RoundCarousel, Card)
  */

  return (
    <Container>
      <Header isLogin={isLogin} onLogout={handleLogout} />
      <ScrollSnap>
        <Upper>
          <GiToDoc />
          <Description />
          <Documentation />
          <LanguageToggle />
          <URLInput />
          <RoundCarousel />
        </Upper>
        <Lower>
          <Gallery />
        </Lower>
      </ScrollSnap>
    </Container>
  )
}

export default MyDocsPage
