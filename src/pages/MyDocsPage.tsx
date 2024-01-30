import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import Header from '../components/Header'
import GiToDoc from '../components/mydocs/upper/GiToDoc'
import Documentation from '../components/mydocs/upper/Documentation'
import LanguageToggle from '../components/mydocs/upper/LanguageToggle'
import URLInput from '../components/mydocs/upper/URLInput'
import RoundCarousel from '../components/mydocs/upper/RoundCarousel'
import Gallery from '../components/mydocs/lower/Gallery'
import {
  cardIdStore,
  isDeleteStore,
  useDarkModeStore,
  isGeneratingStore,
  docStore,
  Doc,
  DocData,
  Keyword,
  isLoadingStore,
} from '../store/store'
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
  position: relative;
  scroll-snap-align: center;
  @media (max-width: 960px) {
    height: 25rem;
    scroll-snap-align: none;
    background: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  }

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
  @media (max-width: 960px) {
    margin-bottom: 50px;
  }
`

// 페이지 하단부
const Lower = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  position: relative;
  background: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  scroll-snap-align: center;
  @media (max-width: 960px) {
    scroll-snap-align: none;
  }
`

const MyDocsPage: React.FC = () => {
  const { docs, setDocs } = docStore()
  const apiUrl = 'https://gitodoc.kro.kr/api/v1/docs'
  // const apiUrl = 'http://localhost:8000/api/v1/docs'
  // const apiUrl = 'https://gtd.kro.kr/api/v1/docs'
  const { cardId } = cardIdStore((state) => ({
    cardId: state.cardId,
    setCardId: state.setCardId,
  }))
  const { setIsLoading } = isLoadingStore()
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
      // 로딩 상태 설정
      setIsLoading(true)
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
      const axiosError = error as AxiosError

      // 아무 문서도 없는 경우
      if (axiosError.response && axiosError.response.status === 404) {
        setIsLoading(false)
        Swal.fire({
          position: 'bottom-end',
          icon: 'info',
          title: 'Enter the repository URL and create a document!.',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        })
      } else {
        // 기타 에러 처리
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Failed to load.',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        })
      }
    }
  }

  // 마운트 할 때 문서 조회
  useEffect(() => {
    getDocs()
  }, [])

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
            {/* <Description /> */}
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
          {docs.length !== 0 && (
            <Lower isDarkMode={isDarkMode}>
              <Gallery docs={docs} />
            </Lower>
          )}
        </ScrollSnap>
      </Container>
    </div>
  )
}

export default MyDocsPage
