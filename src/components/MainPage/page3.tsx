import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import Gitpage from '../../assets/images/MainPage/GitPage.svg'
import gitodocpage from '../../assets/images/MainPage/gitodocpage.svg'
import pointer from '../../assets/images/MainPage/pointer.svg'
import gitodocpage_dark from '../../assets/images/MainPage/gitodocpage_dark.svg'
import GitPage_dark from '../../assets/images/MainPage/GitPage_dark.svg'
import { Blue } from '../../components/MainPage/page2'
import { useDarkModeStore } from '../../store/store'
import DoubleDownArrow from './doubleDownArrow'
import StyledStep from './styledStep'

interface URLprops {
  delay?: string
  top?: string
  left?: string
  littletop?: string
  littleleft?: string
  $isDarkMode: boolean
  visible: boolean
}
// Page (GitPage+gitodoc) : 위치 수정
interface Page {
  top?: string
  left?: string

  $responseTop1200?: string
  $responseLeft1200?: string

  $responseTop890?: string
  $responseLeft890?: string

  $responseTop740?: string
  $responseLeft740?: string

  zindex?: string

  visible?: boolean
}
// keyframes 애니메이션 : flex로 묶어 위치 수정
const slideinFade = keyframes`
  0%{
    opacity: 0;
    transform: translateX(6rem);
  }
  60%{
    opacity:0;
    transform: translateX(6rem);
  }
  100%{
    opacity: 1;
    transform: translateX(0)
  }
`
const movePointer = keyframes`
  0% {
    transform: translateX(0) translateY(0);
  }
  100%{
    transform: translateX(31rem) translateY(13rem);
  }`
const middleMovePointer = keyframes`
  0% {
    transform: translateX(0) translateY(0);
  }
  100%{
    transform: translateX(16rem) translateY(28rem);
  }
  `
const littleMovePointer = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }
  100%{
    transform: translateX(10rem) translateY(23.5rem);
  }
`
const moveURL = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }
  100%{
    transform: translateX(31rem) translateY(13.2rem);
  }
`
const middleMoveURL = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }
  100%{
    transform: translateX(16rem) translateY(28rem);
  }
`
const littleMoveURL = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }
  100%{
    transform: translateX(10rem) translateY(23.5rem);
  }
`

/* -----Wrapper------*/
const Section = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  scroll-snap-align: center;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 7%;
  margin-top: 4%;
  height: 15vh;
  @media (max-width: 890px) {
    margin-top: 7%;
  }
`
const Animationwrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: calc((100vw - 1152px) / 2);
  margin-right: calc((100vw - 1152px) / 2);
  position: relative;
  height: 80vh;
`
// Styled page
const Styledpage = styled.img<Page>`
  width: 42rem;
  height: 27rem;
  position: absolute;
  z-index: ${(props) => props.zindex || '1'};
  top: ${(props) => props.top || '3rem'};
  left: ${(props) => props.left || '0rem'};
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideinFade} 2.5s ease-out
        `
      : 'none'};
  @media (max-width: 1200px) {
    width: 42rem;
    height: 27rem;
    top: ${(props) => props.$responseTop1200 || props.top || '3rem'};
    left: ${(props) => props.$responseLeft1200 || props.left || '0rem'};
  }
  @media (max-width: 890px) {
    width: 30rem;
    height: 20rem;
    top: ${(props) => props.$responseTop890 || props.top || '3rem'};
    left: ${(props) => props.$responseLeft890 || props.left || '0rem'};
  }
`
// pointer : 위치수정
const Styledpointer = styled.img<{ visible: boolean }>`
  width: 5rem;
  height: 3rem;
  position: absolute;
  z-index: 2;
  top: 4rem;
  left: 25.5em;
  animation: ${(props) =>
    props.visible
      ? css`
          ${movePointer} 1s ease-out forwards
        `
      : 'none'};
  animation-delay: 2.5s;

  @media (max-width: 1200px) {
    top: 4.5rem;
    left: 33rem;
    animation: ${(props) =>
      props.visible
        ? css`
            ${middleMovePointer} 1s ease-out forwards
          `
        : 'none'};
    animation-delay: 2.5s;
  }
  @media (max-width: 890px) {
    top: 4rem;
    left: 32.5rem;
    animation: ${(props) =>
      props.visible
        ? css`
            ${littleMovePointer} 1s ease-out forwards
          `
        : 'none'};
    animation-delay: 2.5s;
  }
`
const URLtext = styled.p<URLprops>`
  font-size: 1rem;
  top: 2.85rem;
  left: 12rem;
  /* font-family: 'Inter', sans-serif; */
  position: absolute;
  white-space: nowrap;
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  z-index: 3;
  animation: ${(props) =>
    props.visible
      ? css`
          ${moveURL} 1s ease-out forwards;
        `
      : 'none'};
  animation-delay: 2.5s;
  @media (max-width: 1200px) {
    top: 3rem;
    left: 23.5rem;
    animation: ${(props) =>
      props.visible
        ? css`
            ${middleMoveURL} 1s ease-out forwards;
          `
        : 'none'};
    animation-delay: 2.5s;
  }
  @media (max-width: 890px) {
    font-size: 0.8rem;
    top: 3.2rem;
    left: 22rem;
    animation: ${(props) =>
      props.visible
        ? css`
            ${littleMoveURL} 1s ease-out forwards;
          `
        : 'none'};
    animation-delay: 2.5s;
  }
`
// 해당화면이 사용자에게 보이는지 관찰해주는 API(Dont에 사용)
function useOnScreenDiv(
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
// 해당화면이 사용자에게 보이는지 관찰해주는 API(svg에 사용)
function useOnScreenImg(
  options: IntersectionObserverInit,
): [MutableRefObject<HTMLImageElement | null>, boolean] {
  const ref = useRef<HTMLImageElement | null>(null)
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

// Publishing
export const Page3: React.FC = () => {
  const [refd, visibled] = useOnScreenDiv({ threshold: 0 }) // threshold 비율이 보이는 순간 애니메이션
  const [refi, visiblei] = useOnScreenImg({ threshold: 0 })
  const [refp, visiblep] = useOnScreenImg({ threshold: 0 })
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)

  return (
    <Section>
      <TextWrapper>
        <StyledStep $isDarkMode={$isDarkMode} ref={refd} visible={visibled}>
          <Blue $isDarkMode={$isDarkMode}>&gt; </Blue>step 1;
        </StyledStep>
        <StyledStep
          $isDarkMode={$isDarkMode}
          visible={visibled}
          fontSize="1.2rem"
          $littleFontSize="1rem">
          Copy your repository URL
        </StyledStep>
      </TextWrapper>
      <Animationwrapper>
        <URLtext $isDarkMode={$isDarkMode} ref={refd} visible={visibled}>
          https://github.com/2023WB-TeamB
        </URLtext>
        <Styledpointer ref={refp} visible={visiblep} src={pointer} alt="pointer" />
        <Styledpage
          src={$isDarkMode ? gitodocpage_dark : gitodocpage}
          top="0"
          left="30rem"
          $responseTop1200=" 15rem"
          $responseLeft1200="22rem"
          $responseTop890="15rem"
          $responseLeft890="26rem"
          alt="GiToDocpage"
          ref={refi}
          visible={visiblei}
        />
        <Styledpage
          src={$isDarkMode ? GitPage_dark : Gitpage}
          alt="Githubpage"
          $responseLeft890="15rem"
          $responseLeft1200="10rem"
          zindex="0"
        />
      </Animationwrapper>
      <DoubleDownArrow />
    </Section>
  )
}
