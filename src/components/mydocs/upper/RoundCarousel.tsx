import React, { useState } from 'react'
import styled from 'styled-components'
import Card from '../Card'
import Modal from '../Modal'
import { Doc } from '../../../store/store'
import btn from '../../../assets/images/mydocs/btn.svg'
import { cardIdStore, modalContentStore, modalOpenStore } from '../../../store/store'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 55vh;
  margin-top: 3vh;
`
const Carousel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; // 카드가 캐러셀 밖으로 나가면 안보이게 함
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
  position: absolute;
  left: 15vw;
  top: 25vh;
  background-image: url(${btn});
  transform: translateY(-50%) rotate(45deg);
  opacity: ${({ active }) => (active ? '0.5' : '1')};
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  &:focus {
    outline: none;
  }
`

// 캐러셀 오른쪽 끝에서 Next 버튼 비활성화(disabled) & 숨기기(hidden)
const NextButton = styled.button<{ active: boolean }>`
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  right: 15vw;
  top: 25vh;
  background-image: url(${btn});
  transform: translateY(-50%) rotate(-45deg);
  opacity: ${({ active }) => (active ? '0.5' : '1')};
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  &:focus {
    outline: none;
  }
`
const Title = styled.div`
  text-align: left;
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 0.8rem;
  font-family: 'Inter';
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CreatedAt = styled.div`
  text-align: left;
  font-size: 0.9rem;
  font-weight: 500;
`

const RoundCarousel: React.FC<{ docs: Doc[] }> = ({ docs }) => {
  const [canPrev, setCanPrev] = useState(false) // prev 버튼 활성화
  const [canNext, setCanNext] = useState(true) // next 버튼 활성화
  const [rotate, setRotate] = useState(216)
  const [buttonActive, setButtonActive] = useState(false) // 클릭된 버튼 제어
  const { setCardId } = cardIdStore((state) => ({ setCardId: state.setCardId }))
  const { modalOpen, setModalOpen } = modalOpenStore() // 모달 활성화
  const { modalContent, setModalContent } = modalContentStore((state) => ({
    modalContent: state.modalContent,
    setModalContent: state.setModalContent,
  }))
  const maxCards = 10

  // 카드들의 각도에 따라서 버튼을 보여주는 로직
  // 버튼 클릭 시 활성화 상태(active) 2초(200ms) 유지
  const handlePrev = () => {
    if (!canPrev) return
    setButtonActive(true)
    setTimeout(() => setButtonActive(false), 200)
    const newRotate = rotate + 360 / maxCards
    setRotate(newRotate)
    setCanNext(newRotate + 36 * (docs.length - 1) >= 360 ? true : false)
    setCanPrev(newRotate <= 180 ? true : false)
  }

  const handleNext = () => {
    if (!canNext) return
    setButtonActive(true)
    setTimeout(() => setButtonActive(false), 200)
    const newRotate = rotate - 360 / maxCards
    setRotate(newRotate)
    setCanNext(newRotate + 36 * (docs.length - 1) >= 360 ? true : false)
    setCanPrev(newRotate <= 180 ? true : false)
  }

  const handleCardClick = (item: {
    id: number
    title: string
    created_at: string
    color: string
  }) => {
    // 카드 클릭 시의 이벤트 핸들러
    setCardId(item.id) // 수정/삭제 대상 문서 id 설정
    setModalContent(item) // 클릭한 카드의 정보를 ModalContent에 저장
    setModalOpen(true) // 모달 열기
  }

  return (
    <Wrapper>
      <Carousel>
        {docs.map((doc, i) => {
          const currentRotate = rotate + i * (360 / maxCards) // 각 카드별 각도
          const visible =
            /* 카드의 위치(각도)에 따른 보여주기 속성 결정 */
            ((currentRotate % 360) + 360) % 360 > 180 && ((currentRotate % 360) + 360) % 360 < 360
          return (
            <Card
              key={doc.id}
              rotate={currentRotate} // 카드별로 각도 전달
              visible={visible} // 위치에 따른 카드의 보기 속성 전달
              backgroundColor={doc.color} // 색상 전달
              // 카드 클릭하면 모달에 data 전달
              onClick={() => handleCardClick(doc)}>
              <CreatedAt>{doc.created_at.slice(0, 10)}</CreatedAt>
              <Title>{doc.title}</Title>
            </Card>
          )
        })}
        <PrevButton
          active={buttonActive}
          onClick={handlePrev}
          style={{ visibility: canPrev ? 'visible' : 'hidden' }}
        />
        <NextButton
          active={buttonActive}
          onClick={handleNext}
          style={{ visibility: canNext ? 'visible' : 'hidden' }}
        />
      </Carousel>
      <Modal modalOpen={modalOpen} modalContent={modalContent} setModalOpen={setModalOpen} />
    </Wrapper>
  )
}

export default RoundCarousel
