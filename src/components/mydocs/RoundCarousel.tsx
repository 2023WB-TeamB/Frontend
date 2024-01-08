import React, { useState } from 'react'
import styled from 'styled-components'
import Card from './Card'
import dummy from './data.json'

dummy.sort((a, b) => {
  if (a.updated_at < b.updated_at) return 1
  if (a.updated_at > b.updated_at) return -1

  return 0
})

// 모달 컴포넌트 스타일링
const Modal = styled.div<{ modalOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex; // 항상 flex를 유지
  opacity: ${({ modalOpen }) => (modalOpen ? 1 : 0)}; // modalOpen 상태에 따라 opacity 조절
  visibility: ${({ modalOpen }) =>
    modalOpen ? 'visible' : 'hidden'}; // modalOpen 상태에 따라 visibility 조절
  transition: opacity 0.3s ease, visibility 0.3s ease; // opacity와 visibility에 transition 효과 적용
  justify-content: center;
  align-items: center;
  z-index: 3;
`

const ModalContent = styled.div`
  background: ${({ color }) => color || 'rgba(0, 0, 0, 1)'};
  color: white;
  width: 20rem;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); // 그림자 효과 추가
`

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 40vh;
  margin: 0 auto auto auto;
`
const Carousel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
`

const Button = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 25px;
    height: 3px;
    background-color: #aeaeae;
  }
`

const PrevButton = styled(Button)`
  left: 5vw;
  &:before {
    transform: rotate(0deg) translate(-30%, 150%);
  }
  &:after {
    transform: rotate(90deg) translate(-30%, 660%);
  }
`

const NextButton = styled(Button)`
  right: 5vw;
  &:before {
    transform: rotate(0deg) translate(-70%, 150%);
  }
  &:after {
    transform: rotate(90deg) translate(-30%, 200%);
  }
`

const RoundCarousel: React.FC = () => {
  const [rotate, setRotate] = useState(216)
  const [modalOpen, setModalOpen] = useState(false) // 모달 창의 상태
  const [modalContent, setModalContent] = useState<{
    title: string
    updated_at: string
    content: string
    color: string
  } | null>(null)
  const [canPrev, setCanPrev] = useState(false) // prev 버튼을 누를 수 있는지의 상태
  const [canNext, setCanNext] = useState(true) // next 버튼을 누를 수 있는지의 상태
  // 모달 창에 표시할 내용
  const totalCards = 10

  const handlePrev = () => {
    if (!canPrev) return
    const newRotate = rotate + 360 / totalCards
    setRotate(newRotate)
    setCanNext(newRotate <= 0 ? false : true)
    setCanPrev(newRotate <= 180 ? true : false)
  }

  const handleNext = () => {
    if (!canNext) return
    const newRotate = rotate - 360 / totalCards
    setRotate(newRotate)
    setCanNext(newRotate <= 0 ? false : true)
    setCanPrev(newRotate <= 180 ? true : false)
  }

  const handleCardClick = (item: {
    title: string
    updated_at: string
    content: string
    color: string
  }) => {
    // 카드 클릭 시의 이벤트 핸들러
    setModalContent(item) // 클릭한 카드의 모든 정보를 저장
    setModalOpen(true)
  }

  return (
    <Wrapper>
      <Carousel>
        {dummy.map((item, i) => {
          const currentRotate = rotate + i * (360 / totalCards)
          const visible =
            ((currentRotate % 360) + 360) % 360 > 180 && ((currentRotate % 360) + 360) % 360 < 360
          return (
            <Card
              key={i}
              rotate={currentRotate}
              visible={visible}
              backgroundColor={item.color}
              onClick={() => handleCardClick({ ...item, content: item.content || '' })}>
              <h3>{item.title}</h3>
              <div>#{i + 1}</div>
              <p>{item.updated_at}</p>
            </Card>
          )
        })}
        <PrevButton onClick={handlePrev} style={{ visibility: canPrev ? 'visible' : 'hidden' }} />
        <NextButton onClick={handleNext} style={{ visibility: canNext ? 'visible' : 'hidden' }} />
      </Carousel>

      <Modal modalOpen={modalOpen} onClick={() => setModalOpen(false)}>
        {modalContent && ( // modalContent가 null이 아닐 때만 모달 창의 내용을 보여줌
          <ModalContent color={modalContent.color} onClick={(e) => e.stopPropagation()}>
            <h2>{modalContent.title}</h2>
            <p>{modalContent.updated_at}</p>
            <p>{modalContent.content}</p>
          </ModalContent>
        )}
      </Modal>
    </Wrapper>
  )
}

export default RoundCarousel
