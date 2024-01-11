import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../Card'
import Modal from '../Modal'
import axios from 'axios'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  margin: 2vh auto auto auto;
`
const Carousel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; // 카드가 캐러셀 밖으로 나가면 안보이게 함
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
    background-color: #959191f6;
  }
`

const PrevButton = styled(Button)`
  left: 15vw;
  top: 25vh;
  &:before {
    transform: rotate(0deg) translate(-30%, 150%);
  }
  &:after {
    transform: rotate(90deg) translate(-30%, 660%);
  }
`

const NextButton = styled(Button)`
  right: 15vw;
  top: 25vh;
  &:before {
    transform: rotate(0deg) translate(-70%, 150%);
  }
  &:after {
    transform: rotate(90deg) translate(-30%, 200%);
  }
`

const RoundCarousel: React.FC = () => {
  const [canPrev, setCanPrev] = useState(false) // prev 버튼을 누를 수 있는지의 상태
  const [canNext, setCanNext] = useState(true) // next 버튼을 누를 수 있는지의 상태
  const [rotate, setRotate] = useState(216)
  const [modalOpen, setModalOpen] = useState(false) // 모달 창 상태
  const [modalContent, setModalContent] = useState<{
    // 모달 창에 표시할 내용
    title: string
    updated_at: string
    color: string
  } | null>(null)
  const [docs, setDocs] = useState<Doc[]>([])
  const maxCards = 10
  const apiUrl = 'http://gtd.kro.kr:8000/api/v1/docs/'
  const userId = 23

  interface Doc {
    id: number
    title: string
    updated_at: string
    color: string
  }

  // 카드들의 각도에 따라서 버튼을 보여주는 로직
  const handlePrev = () => {
    if (!canPrev) return
    const newRotate = rotate + 360 / maxCards
    setRotate(newRotate)
    setCanNext(newRotate + 36 * (docs.length - 1) >= 360 ? true : false)
    setCanPrev(newRotate <= 180 ? true : false)
  }

  const handleNext = () => {
    if (!canNext) return
    const newRotate = rotate - 360 / maxCards
    setRotate(newRotate)
    setCanNext(newRotate + 36 * (docs.length - 1) >= 360 ? true : false)
    setCanPrev(newRotate <= 180 ? true : false)
  }

  const handleCardClick = (item: {
    id: number
    title: string
    updated_at: string
    color: string
  }) => {
    // 카드 클릭 시의 이벤트 핸들러
    setModalContent(item) // 클릭한 카드의 정보를 ModalContent에 저장
    setModalOpen(true) // 모달 열기
  }

  const getDocs = async () => {
    try {
      // API 호출
      const response = await axios.get(`${apiUrl}${userId}/`)
      // 결과 확인
      // console.log(response)
      // 최근 10개 문서만 캐러셀에 남기기
      const docs = response.data.data.docs
      docs.length = docs.length > 10 ? 10 : docs.length
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
              key={i}
              rotate={currentRotate} // 카드별로 각도 전달
              visible={visible} // 위치에 따른 카드의 보기 속성 전달
              backgroundColor={doc.color} // 색상 전달
              // 카드에 content가 있는지 확인하고 없으면 빈 문자열 전달
              onClick={() => handleCardClick(doc)}>
              <h3>{doc.title}</h3>
              <div>#{i + 1}</div>
              {/* <p>{item.updated_at}</p> */}
            </Card>
          )
        })}
        <PrevButton onClick={handlePrev} style={{ visibility: canPrev ? 'visible' : 'hidden' }} />
        <NextButton onClick={handleNext} style={{ visibility: canNext ? 'visible' : 'hidden' }} />
      </Carousel>
      <Modal modalOpen={modalOpen} modalContent={modalContent} setModalOpen={setModalOpen} />
    </Wrapper>
  )
}

export default RoundCarousel
