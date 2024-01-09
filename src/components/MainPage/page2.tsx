import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Dont } from '../../pages/MainPage'
import { MonoText } from '../../pages/MainPage'
import { Blue } from '../../pages/MainPage'
import settings from '../../assets/images/MainPage/settings.svg'
import downarrow from '../../assets/images/MainPage/down_arrow.svg'

interface Styledicon {
  top?: string
  left?: string
  width?: string
  height?: string
  centered?: boolean
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

const Styledicon = styled.img<Styledicon>`
  width: 5rem;
  height: 3rem;
  position: absolute;
  top: ${(props) => props.top || '5rem'};
  left: ${(props) => props.left || '3rem'};
  transform: ${(props) => (props.centered ? 'translateX(-50%)' : 'none')};
`
const Hilight = styled.span<MonoProps>`
  background-color: ${(props) => props.hilight || '#000000'};
`
const ConsoleBox = styled.div<ConsoleBox>`
  align-items: center;
  position: absolute;
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '2.7rem'};
  top: ${(props) => props.top || '23rem'};
  left: ${(props) => props.left || '0'};
  background: ${(props) => props.background || '#edeff6'};
`
const ConsoleText = styled.h1`
  position: absolute;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
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

export const Page2: React.FC = () => {
  return (
    <div>
      <Dont>Don't just code.</Dont>
      <Dont fontSize="3rem" top="22%">
        Document. Refine. Archive. Share.
      </Dont>
      <ConsoleBox>
        <ConsoleText>GiToDoc</ConsoleText>
      </ConsoleBox>
      <ConsoleBox height="0.1rem" top="25.55rem" background="#D3E2FD"></ConsoleBox>
      <ConsoleBox width="9rem" height="0.1rem" top="25.55rem" background="#0957D0"></ConsoleBox>
      <ConsoleBox
        width="0.1rem"
        height="1.7rem"
        top="23.5rem"
        left="81.5rem"
        background="#D3E2FD"></ConsoleBox>
      <Styledicon src={settings} top="22.8rem" left="83rem" alt="icons" />
      <MonoText>
        <Blue>&gt; </Blue>&ensp;Coding isn't the end of the journey.
        <br />
        <Blue>&gt; </Blue>&ensp;Make Your Projects perfect to the Last Detail.
        <br />
        <br />
        <Blue>&gt; </Blue>&ensp;With our <Hilight hilight="#FCEBEB">GiToDoc;</Hilight>
        <br />
        <Blue>&gt; </Blue>&ensp;We empower you to go the extra mile, ensuring your project is not
        just done, but perfected.{' '}
        <BlinkText>
          <Hilight>&ensp;</Hilight>
        </BlinkText>
      </MonoText>
      <MonoText fontSize="0.9rem" top="88%" left="50%" centered>
        Keep scrolling if you want to make your project perfect
      </MonoText>
      <Styledicon
        src={downarrow}
        top="94%"
        left="50%"
        centered
        width="1rem"
        height="1rem"
        alt="downarrow"
      />
    </div>
  )
}
