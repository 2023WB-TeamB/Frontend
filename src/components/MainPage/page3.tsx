import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import Gitpage from '../../assets/images/MainPage/GitPage.svg'
import gitodocpage from '../../assets/images/MainPage/gitodocpage.svg'
import pointer from '../../assets/images/MainPage/pointer.svg'
import gitodocpage_dark from '../../assets/images/MainPage/gitodocpage_dark.svg'
import GitPage_dark from '../../assets/images/MainPage/GitPage_dark.svg'
import down_arrow from '../../assets/images/MainPage/down_arrow.svg'
import { Blue } from '../../components/MainPage/page2'
import { useDarkModeStore } from '../../store/store'

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

/* -----Wrapper------*/
const Section = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7%;
  margin-top: 10%;
  height: 15vh;
  gap: 1.3rem;
`
// const Animationwrapper = styled.div`
//   display: flex;
//   /* flex-direction: column; */
//   /* justify-content: center; */
//   align-items: center;
//   /* margin-left: calc((100vw - 1152px) / 2);
//   margin-right: calc((100vw - 1152px) / 2); */

//   @media (max-width: 760px) {
//     margin-left: 7%;
//     margin-right: 7%;
//   }
// `
const Animationwrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  flex-wrap: wrap;
  /* height: 68vh;
  width: 50%; */
  margin: 50px 100px;
`
const Arrowwrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 20vh;
  width: 99vw;
`

// keyframes 애니메이션 : flex로 묶어 위치 수정
const slideUpFade = keyframes`
  0%{
    opacity: 0;
    transform: translateY(3rem);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
`
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
  50%{
    transform: translateX(45rem) translateY(15rem);
  }
  100% {
    transform: translateX(45rem) translateY(15rem);
  }
  `
const largeemovePointer = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }
  50%{
    transform: translateX(55rem) translateY(15rem);
  }
  100%{
    transform: translateX(55rem) translateY(15rem);
  }`
const littlemovePointer = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }
  50%{
    transform: translateX(0) translateY(40rem);
  }
  100%{
    transform: translateX(0) translateY(40rem);
  }`
const moveURL = keyframes`
  0% {
    transform: translateX(0) translateY(0);
  }
  50%{
    transform: translateX(45rem) translateY(15rem);
  }
  100% {
    transform: translateX(45rem) translateY(15rem);
  }
`
const largemoveURL = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }
  50%{
    transform: translateX(55rem) translateY(15rem);
  }
  100%{
    transform: translateX(55rem) translateY(15rem);
  }`
const littlemoveURL = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }
  50%{
    transform: translateX(0) translateY(40rem);
  }
  100%{
    transform: translateX(0) translateY(40rem);
  }
`

/* ----down-arrow animation-----*/
const down_down = keyframes`
0% {
  transform: translateY(0);
  opacity: 0
}
50% {
  opacity: 0.8;
}
100% {
  transform: translateY(1rem);
  opacity: 0;
}
`
interface StyledarrowProps {
  animation: boolean
}

const Styledarrow = styled.img<StyledarrowProps>`
  top: 0;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 2.2rem;
  height: 2.2rem;
  z-index: 3;
  animation: ${(props) =>
    props.animation
      ? css`
          ${down_down} 2s ease-out infinite
        `
      : 'none'};

  @media (max-width: 760px) {
    margin-top: 3rem;
  }
`

//Text
interface DontProps {
  fontSize?: string
  top?: string
  fontfamily?: string
  left?: string
  littleFontSize?: string
}
const Dont = styled.h1<
  DontProps & { visible: boolean; animationType: string; isDarkMode: boolean }
>`
  font-size: ${(props) => props.fontSize || '3rem'};
  font-weight: 400;
  font-family: ${(props) => props.fontfamily || 'DMSerifDisplay'};
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  letter-spacing: 0;
  margin: 0;
  z-index: 2;
  white-space: nowrap;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideUpFade} 1s  ease-out;
        `
      : 'none'};
`
/*--Dont 컴포넌트와 구별해주기 위해 URL text 추가, 'pasteURL'애니메이션 삭제--*/
// interface URLprops {
//   delay?: string
//   top?: string
//   left?: string
//   littletop?: string
//   littleleft?: string
// }
const URLtext = styled.p<{ visible: boolean; isDarkMode: boolean }>`
  font-size: 1rem;
  position: absolute;
  top: 0;
  left: 10rem;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  z-index: 3;
  animation: ${(props) =>
    props.visible
      ? css`
          ${moveURL} 2s ease-out forwards;
        `
      : 'none'};
  animation-delay: 2s;

  @media (min-width: 1550px) {
    left: 17rem;
    animation: ${(props) =>
      props.visible
        ? css`
            ${largemoveURL} 2s ease-out forwards;
          `
        : 'none'};
    animation-delay: 2s;
  }
  @media (max-width: 960px) {
    left: 13.5rem;
    animation: ${(props) =>
      props.visible
        ? css`
            ${littlemoveURL} 2s ease-out forwards;
          `
        : 'none'};
    animation-delay: 2s;
  }
  @media (max-width: 760px) {
    left: 10rem;
    animation: ${(props) =>
      props.visible
        ? css`
            ${littlemoveURL} 2s ease-out forwards;
          `
        : 'none'};
    animation-delay: 2s;
  }
`

//Page (GitPage+gitodoc) : 위치 수정
interface Page {
  top?: string
  left?: string
  zindex?: string
  littletop?: string
  littleleft?: string
}
const Styledpage = styled.img<Page & { visible: boolean; isTarget?: boolean }>`
  width: 40rem;
  height: 25rem;
  position: ${(props) => (props.isTarget ? 'absolute' : 'none')};
  z-index: ${(props) => props.zindex || '1'};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideinFade} 2s ease-out
        `
      : 'none'};
`

//pointer : 위치수정
const Styledpointer = styled.img<{ visible: boolean }>`
  width: 5rem;
  height: 3rem;
  position: absolute;
  z-index: 2;

  top: 1rem;
  left: 23.5rem;
  animation: ${(props) =>
    props.visible
      ? css`
          ${movePointer} 2s ease-out forwards;
        `
      : 'none'};
  animation-delay: 2s;

  @media (min-width: 1550px) {
    left: 30.5rem;
    animation: ${(props) =>
      props.visible
        ? css`
            ${largeemovePointer} 2s ease-out forwards;
          `
        : 'none'};
    animation-delay: 2s;
  }
  @media (max-width: 960px) {
    left: 27rem;
    animation: ${(props) =>
      props.visible
        ? css`
            ${littlemoveURL} 2s ease-out forwards;
          `
        : 'none'};
    animation-delay: 2s;
  }
  @media (max-width: 760px) {
    left: 23.5rem;

    animation: ${(props) =>
      props.visible
        ? css`
            ${littlemovePointer} 2s ease-out forwards;
          `
        : 'none'};
    animation-delay: 2s;
  }
`

//Publishing
export const Page3: React.FC = () => {
  const [refd, visibled] = useOnScreenDiv({ threshold: 0.01 }) //threshold 비율이 보이는 순간 애니메이션
  const [refi, visiblei] = useOnScreenImg({ threshold: 0.01 })
  const [refp, visiblep] = useOnScreenImg({ threshold: 0.01 })
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  return (
    <Section>
      <TextWrapper>
        <Dont isDarkMode={isDarkMode} ref={refd} visible={visibled} animationType="slideUpFade">
          <Blue isDarkMode={isDarkMode}>&gt; </Blue>step 1;
        </Dont>
        <Dont
          isDarkMode={isDarkMode}
          visible={visibled}
          animationType="slideUpFade"
          fontSize="1.2rem"
          littleFontSize="1rem"
          fontfamily="monospace">
          Copy your repository URL
        </Dont>
      </TextWrapper>
      {/* <Animationwrapper> */}
      <Animationwrapper2>
        <URLtext isDarkMode={isDarkMode} ref={refd} visible={visibled}>
          https://github.com/2023WB-TeamB
        </URLtext>
        <Styledpointer ref={refp} visible={visiblep} src={pointer} alt="pointer" />
        <Styledpage
          src={isDarkMode ? GitPage_dark : Gitpage}
          alt="Githubpage"
          visible={false}
          zindex="0"
        />
        <Styledpage
          src={isDarkMode ? gitodocpage_dark : gitodocpage}
          alt="GiToDocpage"
          ref={refi}
          visible={visiblei}
          isTarget={false}
        />
      </Animationwrapper2>
      {/* </Animationwrapper> */}
      <Arrowwrapper>
        <Styledarrow src={down_arrow} animation alt="downarrow" />
      </Arrowwrapper>
    </Section>
  )
}
