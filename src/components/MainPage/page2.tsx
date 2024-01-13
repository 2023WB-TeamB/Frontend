import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import settings from '../../assets/images/MainPage/settings.svg'
import down_arrow from '../../assets/images/MainPage/down_arrow.svg'
import { useDarkModeStore } from '../../store/store'

//해당화면이 사용자에게 보이는지 관찰해주는 API(Dont에 사용)
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

//keyframes
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
const blink = keyframes`
  0%, 100% {visibility: visible;}
  50% {visibility: hidden;}
  `

//icon(svg)
interface Styledicon {
  top?: string
  left?: string
  width?: string
  height?: string
  centered?: boolean
}
export const Styledicon = styled.img<Styledicon>`
  width: 5rem;
  height: 3rem;
  position: absolute;
  z-index: 3;
  top: ${(props) => props.top || '5rem'};
  left: ${(props) => props.left || '3rem'};
  transform: ${(props) => (props.centered ? 'translateX(-50%)' : 'none')};
`

//Text(DMSerifDisplay)
interface DontProps {
  fontSize?: string
  top?: string
  fontfamily?: string
}
const Dont = styled.h1<DontProps & { visible: boolean; isDarkMode: boolean }>`
  font-size: ${(props) => props.fontSize || '4rem'};
  font-weight: 700;
  font-family: 'DMSerifDisplay', serif;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
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

//Text(Mono)
interface MonoProps {
  fontSize?: string
  top?: string
  left?: string
  centered?: boolean
  hilight?: string
  color?: string
}
const MonoText = styled.h1<MonoProps & { isDarkMode: boolean }>`
  font-size: ${(props) => props.fontSize || '1rem'};
  font-weight: 400;
  font-family: monospace;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  position: absolute;
  top: ${(props) => props.top || '55%'};
  left: ${(props) => props.left || '5%'};
  letter-spacing: 0.5px;
  line-height: 2;
  white-space: nowrap;
  transform: ${(props) => (props.centered ? 'translateX(-50%)' : 'none')};
`
export const Blue = styled.span<{ isDarkMode: boolean }>`
  color: ${(props) => (props.isDarkMode ? '#5F7EAF' : '#1c6ef3')};
`
const Hilight = styled.span<
  MonoProps & { hilightDark: string; hilightLight: string; isDarkMode: boolean }
>`
  background-color: ${(props) =>
    props.isDarkMode ? props.hilightDark : props.hilightLight || 'black'};
`

//Console
interface ConsoleBox {
  background?: string
  height?: string
  width?: string
  top?: string
  left?: string
}
const ConsoleBox = styled.div<
  ConsoleBox & { backgroundLight: string; backgroundDark: string; isDarkMode: boolean }
>`
  display: flex;
  align-items: center;
  position: absolute;
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '2.7rem'};
  top: ${(props) => props.top || '23rem'};
  left: ${(props) => props.left || '0'};
  background: ${(props) =>
    props.isDarkMode ? props.backgroundDark : props.backgroundLight || '#edeff6'};
`
const ConsoleText = styled.h1<{ isDarkMode: boolean }>`
  position: absolute;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  left: 3rem;
  font-size: 0.9rem;
  color: ${(props) => (props.isDarkMode ? '#5F7EAF' : '#0957d0')};
`
const BlinkText = styled.p`
  display: inline;
  animation: ${blink} 1s step-start infinite;
`

//Publishing
export const Page2: React.FC = () => {
  const [ref, visible] = useOnScreen({ threshold: 0.1 })
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  return (
    <div>
      <Dont ref={ref} visible={visible} isDarkMode={isDarkMode}>
        Don't just code.
      </Dont>
      <Dont fontSize="3rem" top="22%" visible={visible} ref={ref} isDarkMode={isDarkMode}>
        Document. Refine. Archive. Share.
      </Dont>
      <ConsoleBox isDarkMode={isDarkMode} backgroundDark="#343434" backgroundLight="#edeff6">
        <ConsoleText isDarkMode={isDarkMode}>GiToDoc</ConsoleText>
      </ConsoleBox>
      <ConsoleBox
        isDarkMode={isDarkMode}
        height="0.1rem"
        top="25.55rem"
        backgroundDark="#5E5E5E"
        backgroundLight="#D3E2FD"></ConsoleBox>
      <ConsoleBox
        isDarkMode={isDarkMode}
        width="9rem"
        height="0.1rem"
        top="25.55rem"
        backgroundDark="#5F7EAF"
        backgroundLight="#0957D0"></ConsoleBox>
      <ConsoleBox
        width="0.1rem"
        height="1.7rem"
        top="23.5rem"
        left="81.5rem"
        backgroundLight="#D3E2FD"
        backgroundDark="#5E5E5E"
        isDarkMode={isDarkMode}></ConsoleBox>
      <Styledicon src={settings} top="22.8rem" left="83rem" alt="icons" />
      <MonoText isDarkMode={isDarkMode}>
        <Blue isDarkMode={isDarkMode}>&gt; </Blue>&ensp;Coding isn't the end of the journey.
        <br />
        <Blue isDarkMode={isDarkMode}>&gt; </Blue>&ensp;Make Your Projects perfect to the Last
        Detail.
        <br />
        <br />
        <Blue isDarkMode={isDarkMode}>&gt; </Blue>&ensp;With our{' '}
        <Hilight hilightLight="#FCEBEB" hilightDark="#4E3534" isDarkMode={isDarkMode}>
          GiToDoc;
        </Hilight>
        <br />
        <Blue isDarkMode={isDarkMode}>&gt; </Blue>&ensp;We empower you to go the extra mile,
        ensuring your project is not just done, but perfected.{' '}
        <BlinkText>
          <Hilight hilightLight="black" hilightDark="white" isDarkMode={isDarkMode}>
            &ensp;
          </Hilight>
        </BlinkText>
      </MonoText>
      <MonoText
        fontSize="0.9rem"
        top="46.5rem"
        left="50%"
        centered
        color="#8E004B"
        isDarkMode={isDarkMode}>
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
