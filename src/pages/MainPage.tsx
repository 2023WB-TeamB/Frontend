import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import Register from '../components/Register'
import Header from '../components/Header'
import { Page3 } from '../components/MainPage/page3'
import { Page4 } from '../components/MainPage/page4'
import { Page5 } from '../components/MainPage/page5'
import { Page2 } from '../components/MainPage/page2'
// import { GlobalStyle } from '../styles/global.ts'

const Container = styled.div`
  scroll-snap-type: y mandatory;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Section = styled.section`
  scroll-snap-align: start;
  position: relative;
  width: 100vw;
  height: 100vh;
`

//page1
const Main = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  font-family: 'DMSerif', serif;
  color: transparent;
  background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
  -webkit-background-clip: text;
  position: absolute;
  top: 17%;
  left: 50%;
  transform: translateX(-50%);
`
const Smalli = styled.span`
  font-size: 7rem;
`

export const Sub = styled.h1`
  font-size: 1.2rem;
  font-weight: 300;
  font-family: Inter, sans-serif;
  color: black;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`
const InputBoxWrapper = styled.div`
  position: absolute;
  width: 40.39rem;
  top: 53%;
  left: 50%;
  transform: translateX(-50%);
  &:before {
    content: '';
    position: absolute;
    top: -0.063rem;
    left: -0.063rem;
    bottom: -0.063rem;
    right: -0.063rem;
    background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
    border-radius: 4.09rem;
    z-index: -1;
  }
`
const InputBox = styled.input`
  background-color: #ffffff;
  border: solid 0.063rem transparent;
  border-radius: 4.09rem;
  box-shadow: 0.125rem 0.25rem 0.3125rem #0000001a;
  height: 3.5rem;
  width: 40rem;
  text-align: center;
  font-size: 1.3rem;
  color: #1a1a1a;
`
//page2
interface DontProps {
  fontSize?: string
  top?: string
}
interface MonoProps {
  fontSize?: string
  top?: string
  left?: string
  centered?: boolean
  hilight?: string
}

export const Dont = styled.h1<DontProps>`
  font-size: ${(props) => props.fontSize || '4rem'};
  font-weight: 700;
  font-family: 'DMSerif', serif;
  color: #000000;
  position: absolute;
  top: ${(props) => props.top || '12%'};
  left: 5%;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
`
export const MonoText = styled.h1<MonoProps>`
  font-size: ${(props) => props.fontSize || '1rem'};
  font-weight: 400;
  font-family: monospace;
  color: #000000;
  position: absolute;
  top: ${(props) => props.top || '55%'};
  left: ${(props) => props.left || '5%'};
  letter-spacing: 0.5px;
  line-height: 2;
  white-space: nowrap;
  transform: ${(props) => (props.centered ? 'translateX(-50%)' : 'none')};
`
export const Blue = styled.span`
  color: #1c6ef3;
`

//Publishing
const MainPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  /* 모달 이벤트 핸들러 */
  // 모달 열기
  const handleModalOpen = () => {
    setIsOpen(true)
  }
  // 모달 닫기
  const handleModalClose = () => {
    setIsOpen(false)
  }
  const isLogin: boolean = false // 기본값은 로그아웃 상태

  return (
    <Container className="scroll">
      <Header isLogin={isLogin} />
      <Section>
        <Main>
          G<Smalli>i</Smalli>ToDoc
        </Main>
        <Sub>Join us to change github repository to file!</Sub>
        <InputBoxWrapper>
          <InputBox type="text" />
        </InputBoxWrapper>
        <div>
          <button onClick={handleModalOpen}>모달 테스트 버튼</button>
          <Register isOpen={isOpen} onClose={handleModalClose} />
        </div>
      </Section>
      {/* page2 */}
      <Section>
        <Page2 />
      </Section>
      <Section>
        <Page3 />
      </Section>
      <Section>
        <Page4 />
      </Section>
      <Section>
        <Page5 />
      </Section>
    </Container>

    // <div>
    //   <Header isLogin={isLogin} />
    //   <h1>GiToDoc</h1>
    //   <p>Join us to change github repository to file!</p>

    //   {/* Resister 모달을 띄우기 위한 임시 버튼 */}
    //   <button onClick={handleModalOpen}>모달 테스트 버튼</button>
    //   <Register isOpen={isOpen} onClose={handleModalClose} />
    // </div>
  )
}

export default MainPage
