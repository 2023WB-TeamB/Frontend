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
import { cardColorStore, cardIdStore, modalOpenStore, useDarkModeStore } from '../store/store'
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
  height: 100%;
  width: 100vw;
  overflow-y: scroll;
  overflow-x: hidden;
`
// 페이지 상단부
const Upper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100vw;
  scroll-snap-align: center;
  position: relative;

  background: ${(props) =>
    props.isDarkMode
      ? 'linear-gradient(#202020, #202020 80%, rgb(42, 42, 42, 1))'
      : 'linear-gradient(white, white 80%, rgb(240, 240, 240, 1));'};
`
//페이지 하단부
const Lower = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  scroll-snap-align: center;
  position: relative;
  background: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
`

const MyDocsPage: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>([])
  const apiUrl = 'https://gtd.kro.kr/api/v1/docs/'
  const { cardId } = cardIdStore((state) => ({
    cardId: state.cardId,
    setCardId: state.setCardId,
  }))
  const { cardColor } = cardColorStore((state) => ({
    cardColor: state.cardColor,
    setCardColor: state.setCardColor,
  }))
  const { modalOpen } = modalOpenStore()
  const isLogin: boolean = true // 기본값은 로그인이 된 상태
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  const getDocs = async () => {
    try {
      // API 호출, 엑세스 토큰
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      const docs = response.data.data
      setDocs(docs)
      console.log(docs)
    } catch (error) {
      // API 호출 실패
      console.error('API Error: ', error)
      alert('API 호출에 실패하였습니다.')
    }
  }

  useEffect(() => {
    getDocs()
  }, [])

  // DB에 있는 문서 색상 변경
  const putColor = async () => {
    try {
      // API 호출, 엑세스 토큰
      const access = localStorage.getItem('accessToken')
      const response = await axios.put(
        `${apiUrl}${cardId}/`,
        { color: `${cardColor}` },
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )
      console.log(response)

      // 문서 수정 성공
      if (response.status === 200) {
        console.log('API Response: ', response.status)
      }
    } catch (error: any) {
      // 문서 수정 실패
      if (error.response) {
        console.error('API Response: ', error.response)
        console.log(error.response)
        alert(error.response.message)
      }
    }
  }

  // 모달 창이 닫힐 때 DB 색상 변경 요청
  useEffect(() => {
    if (modalOpen === false && cardId !== 0) {
      putColor()
    }
  }, [modalOpen])

  // 클라이언트 문서 색상 변경
  const updateCardColor = () => {
    setDocs((docs) => docs.map((doc) => (doc.id === cardId ? { ...doc, color: cardColor } : doc)))
  }

  // 색상 선택 할 때마다 클라이언트 색상 변경
  useEffect(() => {
    updateCardColor()
  }, [cardColor])

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
          <Upper isDarkMode={isDarkMode}>
            <GiToDoc />
            <Description />
            <Documentation />
            <LanguageToggle />
            <URLInput />
            <RoundCarousel docs={docs.slice(0, 10)} />
          </Upper>
          <Lower isDarkMode={isDarkMode}>
            <Gallery docs={docs} />
          </Lower>
        </ScrollSnap>
      </Container>
    </div>
  )
}

export default MyDocsPage
