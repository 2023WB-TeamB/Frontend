import React, { useState } from 'react'
import styled from 'styled-components'
import dummy from '../data.json'
import Modal from '../Modal'

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

const Card = styled.div`
  border-radius: 1.5rem;
  line-height: 1rem;
  color: white;
  box-sizing: border-box;
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
    content: string
    color: string
  } | null>(null)

  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 번호
  const cardsPerPage = 8 // 한 페이지당 카드 수

  const handleCardClick = (item: {
    id: number
    title: string
    updated_at: string
    content: string
    color: string
  }) => {
    setModalContent(item)
    setModalOpen(true)
  }

  // 현재 페이지에 맞는 카드만을 잘라내는 부분
  const currentCards = dummy.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

  return (
    <Wrapper>
      <Collection>
        {currentCards.map((item, i) => (
          <Card
            key={i}
            onClick={() => handleCardClick(item)}
            style={{ backgroundColor: item.color }}>
            <h3>{item.title}</h3>
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
          disabled={currentPage === Math.ceil(dummy.length / cardsPerPage)}>
          Next
        </button>
      </div>
    </Wrapper>
  )
}

export default Gallery
