import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import { Doc } from '../../../store/types'
import btn from '../../../assets/images/mydocs/btn.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { cardIdStore, modalOpenStore } from '../../../store/store'

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
`

const Collection = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  height: 85vh;
  width: 70rem;
  margin: auto 5vw;
`
const Card = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  border-radius: 1.5rem;
  line-height: 1.7rem;
  color: white;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: relative;
  text-align: left;
  font-size: 1.1rem;
  width: 13.5rem;
  height: 18rem;
  padding: 1rem 1.5rem;
  margin: 0.5rem 2rem;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  &:hover {
    //호버 시 카드 커지는 효과
    transform: scale(1.03);
  }
  h3 {
    overflow: hidden;
    width: 11rem;
    height: 13.5rem;
    margin: 0.8rem 0.3rem 1rem 0.3rem;
  }
`

// 꺽쇠 이미지 하나 불러와서 회전시켜서 Prev, Next 버튼으로 사용
// 버튼 클릭될(active) 때 색깔 흐려지는 효과,  focus 테두리 none
// 캐러셀 왼쪽 끝에서 Prev 버튼 비활성화(disabled) & 숨기기(hidden)
const PrevButton = styled.button<{ active: boolean }>`
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: relative;
  background-image: url(${btn});
  transform: rotate(90deg);
  opacity: ${({ active }) => (active ? '0.5' : '1')};
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  &:focus {
    outline: none;
  }
`

const NextButton = styled.button<{ active: boolean }>`
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: relative;
  background-image: url(${btn});
  transform: rotate(-90deg);
  opacity: ${({ active }) => (active ? '0.5' : '1')};
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  &:focus {
    outline: none;
  }
`
// 페이지 위치 나타내는 부분
const PageDotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`

const PageDot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#5d5d5d' : 'lightgray')};
  margin: 0 5px;
`

const Gallery: React.FC<{ docs: Doc[] }> = ({ docs }) => {
  const { modalOpen, setModalOpen } = modalOpenStore()
  const [modalContent, setModalContent] = useState<{
    id: number
    title: string
    created_at: string
    color: string
  } | null>(null)
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 번호
  const [buttonActive, setButtonActive] = useState(false) // 버튼 클릭 활성화 상태. opacity 변화 유지하는 데에 사용됨
  const [direction, setDirection] = useState(0) // 페이지 이동 방향
  const [targetPage, setTargetPage] = useState(currentPage)
  useEffect(() => {
    setCurrentPage(targetPage) // direction 상태가 변경될 때 targetPage 상태를 기반으로 currentPage를 업데이트. setDirection과 setCurrentPage의 비동기 호출을 순서대로 이뤄지게 함.
  }, [targetPage])
  const { setCardId } = cardIdStore((state) => ({
    cardId: state.cardId,
    setCardId: state.setCardId,
  }))
  const cardsPerPage = 8 // 한 페이지당 카드 수
  const totalPageNum = Math.ceil(docs.length / cardsPerPage) // 총 페이지 수를 계산합니다.

  const handleCardClick = (item: {
    id: number
    title: string
    created_at: string
    color: string
  }) => {
    setCardId(item.id) // 컬러 수정할 문서 id 설정
    setModalContent(item)
    setModalOpen(true)
  }

  const handlePrev = () => {
    setButtonActive(true)
    setTimeout(() => setButtonActive(false), 200) // 200ms 후에 opacity를 원상태로 복구
    setDirection(-1) // 페이지 이동 애니메이션 방향 설정
    setTargetPage(currentPage - 1) // 페이지 변경
  }

  const handleNext = () => {
    setButtonActive(true)
    setTimeout(() => setButtonActive(false), 200)
    setDirection(1)
    setTargetPage(currentPage + 1)
  }

  // 페이지 이동 애니메이션 설정
  const variants = {
    initial: { opacity: 0.65, x: 130 * direction, transition: { duration: 0.2 } }, // 초기 상태
    animate: { opacity: 1, x: 0, transition: { duration: 0.25 } }, // 애니메이션 상태
    exit: { opacity: 0, x: -130 * direction, transition: { duration: 0.25 } }, // 페이지 전환
  }

  // 현재 페이지에 맞는 카드만을 잘라내는 부분
  const currentCards = docs.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

  return (
    <GalleryWrapper>
      <Wrapper>
        <PrevButton active={buttonActive} onClick={handlePrev} disabled={currentPage === 1} />
        <AnimatePresence mode="wait">
          <Collection
            key={currentPage}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit">
            {currentCards.map((doc) => (
              <Card key={doc.id} backgroundColor={doc.color} onClick={() => handleCardClick(doc)}>
                <h3>{doc.title}</h3>
              </Card>
            ))}
          </Collection>
        </AnimatePresence>
        <NextButton
          active={buttonActive}
          onClick={handleNext}
          disabled={currentPage === totalPageNum}
        />
        <Modal modalOpen={modalOpen} modalContent={modalContent} setModalOpen={setModalOpen} />
      </Wrapper>
      <PageDotContainer>
        {Array.from({ length: totalPageNum }).map((_, i) => (
          <PageDot key={i} active={i + 1 === currentPage} />
        ))}
      </PageDotContainer>
    </GalleryWrapper>
  )
}

export default Gallery
