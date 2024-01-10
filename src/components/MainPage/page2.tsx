import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import settings from '../../assets/images/MainPage/settings.svg'
import down_arrow from '../../assets/images/MainPage/down_arrow.svg'

function useOnScreen(
  options: IntersectionObserverInit,
): [MutableRefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return [ref, visible]
}

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
  color?: string
}
interface ConsoleBox {
  background?: string
  height?: string
  width?: string
  top?: string
  left?: string
}
export const Styledicon = styled.img<Styledicon>`
  width: 5rem;
  height: 3rem;
  position: absolute;
  z-index: 2;
  top: ${(props) => props.top || '5rem'};
  left: ${(props) => props.left || '3rem'};
  transform: ${(props) => (props.centered ? 'translateX(-50%)' : 'none')};
`
interface DontProps {
  fontSize?: string
  top?: string
  fontfamily?: string
}

export const Dont = styled.h1<DontProps & { visible: boolean }>`
  font-size: ${(props) => props.fontSize || '4rem'};
  font-weight: 700;
  font-family: 'DMSerifDisplay', serif;
  color: #000000;
  position: absolute;
  top: ${(props) => props.top || '10%'};
  left: 5%;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideUpFade} 1s ease-in-out
        `
      : 'none'};
`
const slideUpFade = keyframes`
  0%{
    opacity: 0;
    transform: translateY(3rem);
  }
  100%{
    opacity: 1;
    transform: tralateY(0);
  }
`

const MonoText = styled.h1<MonoProps>`
  font-size: ${(props) => props.fontSize || '1rem'};
  font-weight: 400;
  font-family: monospace;
  color: ${(props) => props.color || '#000000'};
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

const Hilight = styled.span<MonoProps>`
  background-color: ${(props) => props.hilight || '#000000'};
`
const ConsoleBox = styled.div<ConsoleBox>`
  display: flex;
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
  const [ref, visible] = useOnScreen({ threshold: 0.1 })

  return (
    <div>
      <Dont ref={ref} visible={visible}>
        Don't just code.
      </Dont>
      <Dont fontSize="3rem" top="22%" visible={visible} ref={ref}>
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
      <MonoText fontSize="0.9rem" top="45rem" left="50%" centered color="#8E004B">
        Keep scrolling if you want to make your project perfect
      </MonoText>
      <Styledicon
        src={down_arrow}
        top="102%"
        left="50%"
        centered
        width="1rem"
        height="1rem"
        alt="downarrow"
      />
    </div>
  )
}
