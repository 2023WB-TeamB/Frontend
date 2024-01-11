import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import GiToDoc from '../components/mydocs/upper/GiToDoc'
import Description from '../components/mydocs/upper/Description'
import Documentation from '../components/mydocs/upper/Documentation'
import LanguageToggle from '../components/mydocs/upper/LanguageToggle'
import URLInput from '../components/mydocs/upper/URLInput'
import RoundCarousel from '../components/mydocs/upper/RoundCarousel'
import Gallery from '../components/mydocs/lower/Gallery'
import { Doc } from '../store/types'
import axios from 'axios'

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
  const [docs, setDocs] = useState<Doc[]>([])
  const apiUrl = 'http://gtd.kro.kr:8000/api/v1/docs/'
  const isLogin: boolean = true // 기본값은 로그인이 된 상태

  const getDocs = async () => {
    try {
      // API 호출
      const response = await axios.get(`${apiUrl}`)
      const docs = response.data.data.docs
      setDocs(docs)
      console.log(response.data.data)
    } catch (error) {
      // API 호출 실패
      console.error('API Error: ', error)
      alert('API 호출에 실패하였습니다.')
    }
  }

  useEffect(() => {
    getDocs()
  }, [])

  /* Upper
  GiToDoc 로고 (GiToDoc)
  로고 하단 설명 (Description)
  문서화 아이콘 (Documentation)
  언어 토글 (LanguageToggle)
  URL 입력창 (URLInput)
  캐러셀 (RoundCarousel, Card)
  */

  return (
    <div>
      <Header isLogin={isLogin} />
      <Container>
        <ScrollSnap>
          <Upper>
            <GiToDoc />
            <Description />
            <Documentation />
            <LanguageToggle />
            <URLInput />
            <RoundCarousel docs={docs.slice(0, 10)} />
          </Upper>
          <Lower>
            <Gallery docs={docs} />
          </Lower>
        </ScrollSnap>
      </Container>
    </div>
  )
}

export default MyDocsPage
