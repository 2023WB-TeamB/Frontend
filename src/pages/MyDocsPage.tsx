import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import GiToDoc from '../components/mydocs/upper/GiToDoc'
import Description from '../components/mydocs/upper/Description'
import Documentation from '../components/mydocs/upper/Documentation'
import LanguageToggle from '../components/mydocs/upper/LanguageToggle'
import URLInput from '../components/mydocs/upper/URLInput'
import RoundCarousel from '../components/mydocs/upper/RoundCarousel'
import Gallery from '../components/mydocs/lower/Gallery'
import {
  cardColorStore,
  cardIdStore,
  modalOpenStore,
  isDeleteStore,
  useDarkModeStore,
  isGeneratingStore,
  docStore,
  Doc,
  DocData,
  Keyword,
  previewOpenStore,
} from '../store/store'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Animation } from '../components/mydocs/upper/Loading'
import { useLocalStorageStore } from '../components/useModalStore'

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

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(#202020, #202020 80%, rgb(42, 42, 42, 1));
    opacity: ${(props) => (props.isDarkMode ? 1 : 0)};
    transition: opacity ease 0.5s;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(white, white 80%, rgb(240, 240, 240, 1));
    opacity: ${(props) => (props.isDarkMode ? 0 : 1)};
    transition: opacity ease 0.5s;
  }
`

// 문서 생성 부분(URL, 로딩)
const Generation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 23vh;
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
  transition: ease 0.5s;
`

const MyDocsPage: React.FC = () => {
  const { docs, setDocs } = docStore()
  const apiUrl = 'https://gitodoc.kro.kr/api/v1/docs'
  // const apiUrl = 'http://localhost:8000/api/v1/docs'
  const { cardId } = cardIdStore((state) => ({
    cardId: state.cardId,
    setCardId: state.setCardId,
  }))
  const { cardColor } = cardColorStore((state) => ({
    cardColor: state.cardColor,
    setCardColor: state.setCardColor,
  }))
  const { modalOpen } = modalOpenStore()
  const { previewOpen } = previewOpenStore()
  const { isDelete, setIsDelete } = isDeleteStore()
  const { isGenerating } = isGeneratingStore()
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { isGetToken, setisGetToken } = useLocalStorageStore()

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      // console.log('토큰있음')
      setisGetToken(false)
    } else setisGetToken(true)
  }, ['accessToken'])

  const getDocs = async () => {
    try {
      // API 호출, 엑세스 토큰
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      const docsData: DocData[] = response.data.data
      // json 타입의 keywords를 string[] 타입의 tags로 변환하여 Doc에 추가
      const docs: Doc[] = docsData.map((doc: DocData) => ({
        ...doc,
        repo: doc.repository_url.replace('https://github.com/', ''),
        tags: doc.keywords.map((keyword: Keyword) => keyword.name),
      }))
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
        `${apiUrl}/${cardId}`,
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
    if (modalOpen === false && cardId !== 0 && isDelete === false) {
      putColor()
    }
  }, [modalOpen])

  // 프리뷰 창이 닫힐 때 DB 색상 변경 요청
  useEffect(() => {
    if (previewOpen === false && cardId !== 0 && isDelete === false) {
      putColor()
    }
  }, [previewOpen])

  // 클라이언트 문서 색상 변경
  const updateCardColor = () => {
    const newDocs = docs.map((doc) => (doc.id === cardId ? { ...doc, color: cardColor } : doc))
    setDocs(newDocs)
  }

  // 색상 선택 할 때마다 클라이언트 색상 변경
  useEffect(() => {
    updateCardColor()
  }, [cardColor])

  // 문서를 삭제하는 API 요청
  const deleteDoc = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      await axios.delete(`${apiUrl}/${cardId}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setDocs(docs.filter((doc) => doc.id !== cardId)) // 클라이언트에서 문서 카드 삭제
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Successfully deleted.',
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      })
    } catch (error) {
      console.error('API Error: ', error)
      alert('문서 삭제에 실패하였습니다.')
    }
  }

  // 문서를 삭제하는 함수
  useEffect(() => {
    if (isDelete) {
      deleteDoc()
      setIsDelete(false) // 삭제 후 isDelete 상태를 false로 변경
    }
  }, [isDelete])

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
      <Header isGetToken={isGetToken} />
      <Container>
        <ScrollSnap>
          <Upper isDarkMode={isDarkMode}>
            <GiToDoc />
            <Description />
            <Generation>
              {isGenerating ? (
                <Animation />
              ) : (
                <>
                  <Documentation />
                  <LanguageToggle />
                  <URLInput />
                </>
              )}
            </Generation>
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
