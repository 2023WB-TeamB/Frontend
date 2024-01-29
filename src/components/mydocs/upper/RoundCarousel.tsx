import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import Card from '../Card'
import Modal from '../Modal'
import { Doc, cardIdStore, modalContentStore, modalOpenStore } from '../../../store/store'
import CarouselSkeleton from './CarouselSkeleton'
import btn from '../../../assets/images/mydocs/btn.svg'
import down_arrow from '../../../assets/images/MainPage/down_arrow.svg'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 57vh;
  margin-top: 3vh;

  @media (max-width: 960px) {
    display: none;
  }
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
  width: 60px;
  height: 60px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  left: 15vw;
  bottom: 20vh;
  transform: translate(-65%, 0%) rotate(90deg);
  opacity: ${({ active }) => (active ? '0.5' : '1')};
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  &:focus {
    outline: none;
  }
`

// 캐러셀 오른쪽 끝에서 Next 버튼 비활성화(disabled) & 숨기기(hidden)
const NextButton = styled.button<{ active: boolean }>`
  width: 60px;
  height: 60px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  right: 15vw;
  bottom: 20vh;
  transform: translate(15%, 40%) rotate(-90deg);
  opacity: ${({ active }) => (active ? '0.5' : '1')};
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  &:focus {
    outline: none;
  }
`

// 문서 생성일
const CreatedAt = styled.div`
  margin-top: 0.5rem;
  text-align: left;
  font-size: 0.74rem;
  font-weight: 300;
`

const Title = styled.div`
  text-align: left;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.5rem;
  margin-top: 0.2rem;
  /* font-family: 'Inter'; */
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  min-height: 5.7rem;
  line-height: 1.2rem; // 한 줄당 태그의 높이를 제한
  margin-top: 0.2rem;
  overflow: hidden;
`

const Tag = styled.text<{ color: string }>`
  color: ${({ color }) => color};
  background-color: #f8f8f8;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 0.58rem;
  margin-top: 0.3rem;
  margin-right: 0.2rem;
  padding: 0rem 0.3rem;
`

const down_down = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(1rem);
    opacity: 0;
  }
`

// icon(svg)
interface StylediconProps {
  animation: boolean
}

const Styledicon = styled.img<StylediconProps>`
  position: absolute;
  bottom: 1.5rem;
  left: calc(50% - 1.1rem);
  width: 2.2rem;
  height: 2.2rem;
  z-index: 3;
  animation: ${(props) =>
    props.animation
      ? css`
          ${down_down} 1.2s ease-out infinite
        `
      : 'none'};
`

const RoundCarousel: React.FC<{ docs: Doc[] }> = ({ docs }) => {
  const [canPrev, setCanPrev] = useState(false) // prev 버튼 활성화
  const [canNext, setCanNext] = useState(false) // next 버튼 활성화
  const [rotate, setRotate] = useState(216)
  const [prevButtonActive, setPrevButtonActive] = useState(false)
  const [nextButtonActive, setNextButtonActive] = useState(false)
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
    setPrevButtonActive(true)
    setTimeout(() => setPrevButtonActive(false), 200)
    const newRotate = rotate + 360 / maxCards
    setRotate(newRotate)
    setCanNext(newRotate + 36 * (docs.length - 1) >= 360)
    setCanPrev(newRotate <= 180)
  }

  const handleNext = () => {
    if (!canNext) return
    setNextButtonActive(true)
    setTimeout(() => setNextButtonActive(false), 200)
    const newRotate = rotate - 360 / maxCards
    setRotate(newRotate)
    setCanNext(newRotate + 36 * (docs.length - 1) >= 360)
    setCanPrev(newRotate <= 180)
  }

  // 문서가 5개 이상 일 때만 캐러셀 버튼 활성화
  useEffect(() => {
    if (docs.length > 4) setCanNext(true)
  }, [docs.length])

  const handleCardClick = (item: {
    id: number
    title: string
    created_at: string
    color: string
    repo: string
    tags: string[]
  }) => {
    // 카드 클릭 시의 이벤트 핸들러
    setCardId(item.id) // 수정/삭제 대상 문서 id 설정
    setModalContent(item) // 클릭한 카드의 정보를 ModalContent에 저장
    setModalOpen(true) // 모달 열기
  }

  return (
    <Wrapper>
      <Carousel>
        {docs.length === 0
          ? Array.from({ length: 4 }).map((_, i) => {
              const currentRotate = rotate + i * (360 / maxCards)
              const visible =
                ((currentRotate % 360) + 360) % 360 > 180 &&
                ((currentRotate % 360) + 360) % 360 < 360
              return <CarouselSkeleton key={i} rotate={currentRotate} visible={visible} />
            })
          : docs.map((doc, i) => {
              const currentRotate = rotate + i * (360 / maxCards) // 각 카드별 각도
              const visible =
                /* 카드의 위치(각도)에 따른 보여주기 속성 결정 */
                ((currentRotate % 360) + 360) % 360 > 180 &&
                ((currentRotate % 360) + 360) % 360 < 360
              return (
                <Card
                  key={doc.id}
                  rotate={currentRotate}
                  visible={visible}
                  backgroundColor={doc.color}
                  onClick={() => handleCardClick(doc)}>
                  <CreatedAt>{doc.created_at.slice(0, 10)}</CreatedAt>
                  <Title>{doc.title}</Title>
                  <TagWrapper>
                    {doc.tags.map((tag, index) => (
                      <Tag key={index} color={doc.color}>
                        {tag}
                      </Tag>
                    ))}
                  </TagWrapper>
                </Card>
              )
            })}
        <PrevButton
          active={prevButtonActive}
          onClick={handlePrev}
          style={{ visibility: canPrev ? 'visible' : 'hidden' }}>
          <img src={btn} alt="prev" />
        </PrevButton>
        <NextButton
          active={nextButtonActive}
          onClick={handleNext}
          style={{ visibility: canNext ? 'visible' : 'hidden' }}>
          <img src={btn} alt="next" />
        </NextButton>
        <Styledicon src={down_arrow} animation alt="downarrow" />
      </Carousel>
      <Modal modalOpen={modalOpen} modalContent={modalContent} setModalOpen={setModalOpen} />
    </Wrapper>
  )
}

export default RoundCarousel
