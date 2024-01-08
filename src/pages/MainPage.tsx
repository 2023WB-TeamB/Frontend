import React from 'react'
import styled, { keyframes } from 'styled-components'
//import { useState } from 'react'
//import Register from '../components/Register'
import Header from '../components/Header'
import { GlobalStyle } from '../styles/global.ts'

const Container = styled.div`
  scroll-snap-type: y mandatory;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Section = styled.div`
  scroll-snap-align: start;
  position: relative;
  width: 100%;
  height: 100%;
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

//const [isOpen, setIsOpen] = useState(false)
/* 모달 이벤트 핸들러 */
// 모달 열기
/*const handleModalOpen = () => {
  setIsOpen(true)
}
// 모달 닫기
const handleModalClose = () => {
  setIsOpen(false)
}*/
const isLogin: boolean = false // 기본값은 로그아웃 상태

const Sub = styled.h1`
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
interface ConsoleBox {
  background?: string
  height?: string
  width?: string
  top?: string
  left?: string
}

const Dont = styled.h1<DontProps>`
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
const MonoText = styled.h1<MonoProps>`
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
const Blue = styled.span`
  color: #1c6ef3;
`
const Hilight = styled.span<MonoProps>`
  background-color: ${(props) => props.hilight || '#000000'};
`
const ConsoleBox = styled.div<ConsoleBox>`
  display: flex;
  align-items: center;
  position: relative;
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '2.7rem'};
  top: ${(props) => props.top || '48%'};
  left: ${(props) => props.left || '0'};
  background: ${(props) => props.background || '#edeff6'};
`
const ConsoleText = styled.h1`
  position: absolute;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  align-items: center;
  left: 3rem;
  font-size: 0.9rem;
  color: #0957d0;
`
const blink = keyframes`
  0%, 100% {visibility: visible;}
  50% {visibility: hidden;}
  `
const BlinkText = styled.p`
  display: inline;
  animation: ${blink} 1s step-start infinite;
`

//Publishing
const MainPage: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header isLogin={isLogin} />
        <Section>
          <Main>
            G<Smalli>i</Smalli>ToDoc
          </Main>
          <Sub>Join us to change github repository to file!</Sub>
          <InputBoxWrapper>
            <InputBox type="text" />
          </InputBoxWrapper>
        </Section>
        <Section>
          <Dont>Don't just code.</Dont>
          <Dont fontSize="3rem" top="22%">
            Document. Refine. Archive. Share.
          </Dont>
          <ConsoleBox>
            <ConsoleText>GiToDoc</ConsoleText>
          </ConsoleBox>
          <ConsoleBox height="0.1rem" top="48%" background="#D3E2FD"></ConsoleBox>
          <ConsoleBox width="9rem" height="0.1rem" top="47.8%" background="#0957D0"></ConsoleBox>
          <ConsoleBox
            width="0.1rem"
            height="1.7rem"
            top="43.2%"
            left="80rem"
            background="#D3E2FD"></ConsoleBox>
          <MonoText>
            <Blue>&gt; </Blue>&ensp;Coding isn't the end of the journey.
            <br />
            <Blue>&gt; </Blue>&ensp;Make Your Projects perfect to the Last Detail.
            <br />
            <br />
            <Blue>&gt; </Blue>&ensp;With our <Hilight hilight="#FCEBEB">GiToDoc;</Hilight>
            <br />
            <Blue>&gt; </Blue>&ensp;We empower you to go the extra mile, ensuring your project is
            not just done, but perfected.{' '}
            <BlinkText>
              <Hilight>&ensp;</Hilight>
            </BlinkText>
          </MonoText>
          <MonoText fontSize="0.9rem" top="88%" left="50%" centered>
            Keep scrolling if you want to make your project perfect
          </MonoText>
        </Section>
        <Section>
          <Dont font-size="3rem">
            <Blue>&gt; </Blue>step1;
          </Dont>
          <MonoText top="27%" left="8%">
            <Blue>&gt; </Blue>&ensp;Paste
          </MonoText>
        </Section>
        <Section>
          <Dont font-size="3rem">
            <Blue>&gt; </Blue>step2;
          </Dont>
          <MonoText top="27%" left="8%">
            <Blue>&gt; </Blue>&ensp;Automatically generate the document based on your URL
          </MonoText>
        </Section>
        <Section>
          <Dont font-size="3rem">
            <Blue>&gt; </Blue>step3;
          </Dont>
          <MonoText top="27%" left="8%">
            <Blue>&gt; </Blue>&ensp;Make
          </MonoText>
        </Section>
      </Container>
    </>
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
