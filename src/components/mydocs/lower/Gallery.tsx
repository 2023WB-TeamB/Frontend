import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { darken } from 'polished'
import { useMediaQuery } from 'react-responsive'
import { Doc, cardIdStore, previewContentStore, previewOpenStore } from '../../../store/store'
import btn from '../../../assets/images/mydocs/btn.svg'
import Preview from './Preview'
import getContent from './getContent'

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  width: 95vw;
`

const Collection = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* justify-content: flex-start; */
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
  height: 80vh;
  width: 80vw;
  /* margin: auto 3vw; */
`

const Card = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 0.05rem solid darkgray;
  border-radius: 1.5rem;
  color: white;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
  background: ${({ backgroundColor }) =>
    `linear-gradient(135deg, ${backgroundColor}, ${darken(0.02, backgroundColor)})`};
  position: relative;
  word-break: break-all;
  width: 27.5vh;
  min-width: 13.5rem;
  height: 37vh;
  min-height: 17.5rem;
  padding: 4.22vh 3.17vh;
  margin: 1.05vh 4.22vh;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  &:hover {
    //호버 시 카드 커지는 효과
    transform: scale(1.03);
  }
`

const CreatedAt = styled.div`
  text-align: left;
  font-size: 0.8rem;
  font-weight: 400;
`

const Title = styled.div`
  text-align: left;
  font-size: 1.26rem;
  font-weight: 700;
  line-height: 1.7rem;
  /* font-family: 'Inter'; */
  margin-top: 0.5rem;
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
  min-height: 5.8rem;
  line-height: 1.2rem; // 한 줄당 태그의 높이를 제어합니다.
  margin-top: 0.1rem;
  overflow: hidden; // 내용이 넘치면 숨깁니다.
`

const Tag = styled.text<{ color: string }>`
  color: ${({ color }) => color};
  background-color: #f8f8f8;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 0.6rem;
  margin-top: 0.4rem;
  margin-right: 0.2rem;
  padding: 0rem 0.3rem;
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
  position: relative;
  transform: rotate(90deg) translate(-15px, -30%);
  opacity: ${({ active }) => (active ? '0.5' : '1')};
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  &:focus {
    outline: none;
  }
`

const NextButton = styled.button<{ active: boolean }>`
  width: 60px;
  height: 60px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: relative;
  transform: rotate(-90deg) translate(-15px, -30%);
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
  margin-top: 1.5rem;
  margin-bottom: 6vh;
`

const PageDot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#5d5d5d' : 'lightgray')};
  margin: 0 5px;
`

const Gallery: React.FC<{ docs: Doc[] }> = ({ docs }) => {
  const { previewOpen, setPreviewOpen } = previewOpenStore()
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 번호
  const [prevButtonActive, setPrevButtonActive] = useState(false)
  const [nextButtonActive, setNextButtonActive] = useState(false)
  const [direction, setDirection] = useState(0) // 페이지 이동 방향
  const [targetPage, setTargetPage] = useState(currentPage)
  useEffect(() => {
    setCurrentPage(targetPage) // direction 상태가 변경될 때 targetPage 상태를 기반으로 currentPage를 업데이트. setDirection과 setCurrentPage의 비동기 호출을 순서대로 이뤄지게 함.
  }, [targetPage])
  const { setCardId } = cardIdStore((state) => ({ setCardId: state.setCardId }))
  const { previewContent, setPreviewContent } = previewContentStore((state) => ({
    previewContent: state.previewContent,
    setPreviewContent: state.setPreviewContent,
  }))

  // const cardsPerPage = 8 // 한 페이지당 카드 수
  const isNotebook = useMediaQuery({
    query: '(min-width:1211px) and (max-width:1535px)', // 6장
  })
  const isTablet = useMediaQuery({ query: '(min-width:770px) and (max-width:1210px)' }) // 4장
  const isMobile = useMediaQuery({ query: '(max-width:769px)' }) // 2장

  // console.log(isTablet)
  const cardsPerPage = () => {
    return isNotebook ? 6 : isTablet ? 4 : isMobile ? 2 : 8
  }
  // console.log(cardsPerPage())
  const totalPageNum = Math.ceil(docs.length / cardsPerPage()) // 총 페이지 수를 계산합니다.

  const handleCardClick = async (item: {
    id: number
    title: string
    created_at: string
    color: string
    repo: string
    tags: string[]
  }) => {
    setCardId(item.id) // 문서 id 설정
    setPreviewContent({
      ...item,
      content: '',
    }) // content 없이 item 저장
    setPreviewOpen(true)
    const content = await getContent(item.id) // content 불러오기
    setPreviewContent({
      ...item,
      content,
    }) // content를 추가하여 item 저장
  }

  const handlePrev = () => {
    setPrevButtonActive(true)
    setTimeout(() => setPrevButtonActive(false), 200) // 200ms 후에 opacity를 원상태로 복구
    setDirection(-1) // 페이지 이동 애니메이션 방향 설정
    setTargetPage(currentPage - 1) // 페이지 변경
  }

  const handleNext = () => {
    setNextButtonActive(true)
    setTimeout(() => setNextButtonActive(false), 200)
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
  const currentCards = docs.slice((currentPage - 1) * cardsPerPage(), currentPage * cardsPerPage())

  return (
    <GalleryWrapper>
      <Wrapper>
        <PrevButton active={prevButtonActive} onClick={handlePrev} disabled={currentPage === 1}>
          <img src={btn} alt="Prev" />
        </PrevButton>
        <AnimatePresence mode="wait">
          <Collection
            key={currentPage}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit">
            {currentCards.map((doc) => (
              <Card key={doc.id} backgroundColor={doc.color} onClick={() => handleCardClick(doc)}>
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
            ))}
          </Collection>
        </AnimatePresence>
        <NextButton
          active={nextButtonActive}
          onClick={handleNext}
          disabled={currentPage === totalPageNum}>
          <img src={btn} alt="Next" />
        </NextButton>
        <Preview
          previewOpen={previewOpen}
          previewContent={previewContent}
          setPreviewOpen={setPreviewOpen}
        />
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
