import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import settings from '../../assets/images/MainPage/settings.svg'
import settings_dark from '../../assets/images/MainPage/settings_dark.svg'
import down_arrow from '../../assets/images/MainPage/down_arrow.svg'
import page2 from '../../assets/images/MainPage/page2.svg'
import page2_dark from '../../assets/images/MainPage/page2_dark.svg'
import { useDarkModeStore } from '../../store/store'

// 해당화면이 사용자에게 보이는지 관찰해주는 API(Dont에 사용)
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

/* ------Wrapper------ */
const Section = styled.div`
  position: relative;
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  gap: 1.7rem;
  position: relative;
  height: 35rem;
  width: 69.25vw;
  margin-bottom: 1rem;

  @media (max-width: 760px) {
    gap: 2rem;
  }
`
// console에 있는 gitodoc 글씨와 keep scrolling을 위한 wrapper 추가
const Centerwrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: auto;
`

// keyframes
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

// Page.svg
const Styledpage = styled.img`
  /* width: 85vw; */
  width: 70vw;
  height: 35rem;
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;

  @media (max-width: 760px) {
    height: 35rem;
    top: 50%;
  }
`
// icon(svg)
interface StylediconProps {
  top?: string
  left?: string
  width?: string
  height?: string
  animation?: boolean
}

const Styledicon = styled.img<StylediconProps>`
  top: ${(props) => props.top || '0'};
  left: ${(props) => props.left || '0'};
  width: ${(props) => props.width || '7rem'};
  height: ${(props) => props.height || '3rem'};
  z-index: 3;
  animation: ${(props) =>
    props.animation
      ? css`
          ${down_down} 1.2s ease-out infinite
        `
      : 'none'};
`

// Text(DMSerifDisplay)
interface DontProps {
  fontSize?: string
  top?: string
  fontfamily?: string
}
const Smalldont = styled.span`
  font-size: 2.5rem;

  @media (max-width: 890px) {
    font-size: 1.8rem;
  }
`

const Dont = styled.h1<DontProps & { visible: boolean; $isDarkMode: boolean }>`
  margin-left: 5%;
  margin-top: 6%;
  margin-bottom: calc(6% - 3rem);
  font-size: 3.5rem;
  font-weight: 700;
  z-index: 1;
  font-family: 'DMSerifDisplay', serif;
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  top: ${(props) => props.top || '0'};
  left: 5%;
  letter-spacing: 0;
  line-height: 1.2;
  white-space: nowrap;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideUpFade} 1s ease-in-out
        `
      : 'none'};

  @media (max-width: 890px) {
    font-size: 2.5rem;
    margin-top: 15%;
    margin-bottom: calc(9% - 2rem);
  }
`

// Text(Mono)
interface MonoProps {
  fontSize?: string
  marginleft?: string
  marginright?: string
  centered?: boolean
  hilight?: string
  color?: string
  $littleFontSize?: string
}
const MonoText = styled.h1<MonoProps & { $isDarkMode: boolean }>`
  margin-left: ${(props) => props.marginleft || '5%'};
  margin-right: ${(props) => props.marginleft || '5%'};
  margin-bottom: 0;
  font-size: ${(props) => props.fontSize || '0.95rem'};
  font-weight: 400;
  z-index: 1;
  font-family: monospace;
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  letter-spacing: 0.5px;
  line-height: 2;
  transform: ${(props) => (props.centered ? 'translateX(-50%)' : 'none')};

  @media (max-width: 760px) {
    font-size: ${(props) => props.$littleFontSize || props.fontSize || '0.8rem'};
  }
`

export const Blue = styled.span<{ $isDarkMode: boolean }>`
  color: ${(props) => (props.$isDarkMode ? '#5F7EAF' : '#1c6ef3')};
`
const Hilight = styled.span<
  MonoProps & { $hilightDark: string; $hilightLight: string; $isDarkMode: boolean }
>`
  background-color: ${(props) =>
    props.$isDarkMode ? props.$hilightDark : props.$hilightLight || 'black'};
`

// Console : 위치 수정 및 리팩토링
interface ConsoleBoxProps {
  background?: string
  height?: string
  width?: string
  top?: string
  left?: string
  $backgroundLight: string
  $backgroundDark: string
  $borderDark: string
  $borderLight: string
  $isDarkMode: boolean
}
const ConsoleBox = styled.div<ConsoleBoxProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  width: ${(props) => props.width || '69.25vw'};
  height: ${(props) => props.height || '2.4rem'};
  top: ${(props) => props.top || '47.5%'};
  left: ${(props) => props.left || '0'};
  background: ${(props) =>
    props.$isDarkMode ? props.$backgroundDark : props.$backgroundLight || '#edeff6'};
  border-bottom: 0.1rem solid
    ${(props) => (props.$isDarkMode ? props.$borderDark : props.$borderLight || '#5E5E5E')};
  font-size: 0.9rem;
  font-weight: 400;
  color: ${(props) => (props.$isDarkMode ? '#5F7EAF' : '#0957d0')};
  z-index: 2;

  @media (max-width: 760px) {
    font-size: 0.8rem;
  }
`
const BlinkText = styled.p`
  display: inline;
  animation: ${blink} 1s step-start infinite;
`

// Publishing
export const Page2: React.FC = () => {
  const [ref, visible] = useOnScreen({ threshold: 0.1 })
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)

  return (
    <Section>
      <Wrapper>
        <Dont ref={ref} visible={visible} $isDarkMode={$isDarkMode}>
          Don&apos;t just code. <br />
          <Smalldont>Document. Refine. Archive. Share.</Smalldont>
        </Dont>
        <ConsoleBox
          $isDarkMode={$isDarkMode}
          $backgroundDark="#343434"
          $backgroundLight="#edeff6"
          $borderDark="#5E5E5E"
          $borderLight="#D3E2FD">
          <ConsoleBox
            $isDarkMode={$isDarkMode}
            width="9rem"
            top="0"
            $backgroundDark="transparent"
            $backgroundLight="transparent"
            $borderDark="#5F7EAF"
            $borderLight="#0957D0">
            <Centerwrapper>GiToDoc</Centerwrapper>
          </ConsoleBox>
          <Styledicon
            src={$isDarkMode ? settings_dark : settings}
            left="92%"
            animation={false}
            alt="icons"
          />
        </ConsoleBox>
        <MonoText $isDarkMode={$isDarkMode}>
          <Blue $isDarkMode={$isDarkMode}>&gt; </Blue>&ensp;Coding isn&apos;t the end of the
          journey.
          <br />
          <Blue $isDarkMode={$isDarkMode}>&gt; </Blue>&ensp;Make Your Projects perfect to the Last
          Detail.
          <br />
          <br />
          <Blue $isDarkMode={$isDarkMode}>&gt; </Blue>&ensp;With our{' '}
          <Hilight $hilightLight="#FCEBEB" $hilightDark="#8A6565" $isDarkMode={$isDarkMode}>
            GiToDoc;
          </Hilight>
          <br />
          <Blue $isDarkMode={$isDarkMode}>&gt; </Blue>&ensp;We empower you to go the extra mile,
          ensuring your project is not just done, but perfected.{' '}
          <BlinkText>
            <Hilight $hilightLight="black" $hilightDark="white" $isDarkMode={$isDarkMode} />
            &ensp;
          </BlinkText>
        </MonoText>
      </Wrapper>
      <Centerwrapper>
        <MonoText
          fontSize="0.85rem"
          $littleFontSize="0.7rem"
          color="#8E004B"
          marginleft="0"
          marginright="0"
          $isDarkMode={$isDarkMode}>
          Keep scrolling if you want to make your project perfect
        </MonoText>
        <Styledicon src={down_arrow} width="2.2rem" height="2.2rem" animation alt="downarrow" />
      </Centerwrapper>
      <Styledpage src={$isDarkMode ? page2_dark : page2} alt="page image" />
    </Section>
  )
}
