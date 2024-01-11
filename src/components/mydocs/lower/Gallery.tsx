import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import axios from 'axios'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100vh;
`

const Collection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  height: 90vh;
  width: 70rem;
  margin: 2.5rem auto auto auto;
`

const Card = styled.div<{ backgroundColor: string }>`
  border-radius: 1.5rem;
  line-height: 1rem;
  color: white;
  box-sizing: border-box;
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: relative;
  text-align: center;
  font-size: 1.3rem;
  width: 13.5rem;
  height: 18rem;
  margin: 0.5rem 2rem;
  overflow: hidden;
`

const Gallery: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<{
    id: number
    title: string
    updated_at: string
    color: string
  } | null>(null)
  const [docs, setDocs] = useState<Doc[]>([])
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 번호
  const cardsPerPage = 8 // 한 페이지당 카드 수
  const apiUrl = 'http://gtd.kro.kr:8000/api/v1/docs/'
  const userId = 23

  interface Doc {
    id: number
    title: string
    updated_at: string
    color: string
  }

  const getDocs = async () => {
    try {
      // API 호출
      const response = await axios.get(`${apiUrl}${userId}/`)
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

  const handleCardClick = (item: {
    id: number
    title: string
    updated_at: string
    color: string
  }) => {
    setModalContent(item)
    setModalOpen(true)
  }

  // 현재 페이지에 맞는 카드만을 잘라내는 부분
  const currentCards = docs.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

  return (
    <Wrapper>
      <Collection>
        {currentCards.map((doc, i) => (
          <Card key={i} backgroundColor={doc.color} onClick={() => handleCardClick(doc)}>
            <h3>{doc.title}</h3>
          </Card>
        ))}
      </Collection>
      {modalOpen && modalContent && (
        <Modal
          modalOpen={modalOpen}
          modalContent={modalContent}
          setModalOpen={setModalOpen}
          width="30rem"
          fontSize="1.3rem"
        />
      )}
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(docs.length / cardsPerPage)}>
          Next
        </button>
      </div>
    </Wrapper>
  )
}

export default Gallery
