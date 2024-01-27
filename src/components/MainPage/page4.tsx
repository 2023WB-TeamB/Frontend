import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import step2page from '../../assets/images/MainPage/step2page.svg'
import step2page_dark from '../../assets/images/MainPage/step2page_dark.svg'
import githublogo from '../../assets/images/MainPage/githublogo.svg'
import githublogo_dark from '../../assets/images/MainPage/githublogo_dark.svg'
import file from '../../assets/images/MainPage/file.svg'
import file_dark from '../../assets/images/MainPage/file_dark.svg'
import folder from '../../assets/images/MainPage/folder.svg'
import folder_dark from '../../assets/images/MainPage/folder_dark.svg'
import logobox from '../../assets/images/MainPage/logobox.svg'
import logobox_dark from '../../assets/images/MainPage/logobox_dark.svg'
import logoboxopen from '../../assets/images/MainPage/logoboxopen.svg'
import logoboxopen_dark from '../../assets/images/MainPage/logoboxopen_dark.svg'
import document from '../../assets/images/MainPage/document.svg'
import documnet_dark from '../../assets/images/MainPage/document_dark.svg'
import document1 from '../../assets/images/MainPage/document1.svg'
import document1_dark from '../../assets/images/MainPage/document1_dark.svg'
import bar from '../../assets/images/MainPage/bar.svg'
import bar_dark from '../../assets/images/MainPage/bar_dark.svg'
import down_arrow from '../../assets/images/MainPage/down_arrow.svg'
import { Blue } from '../../components/MainPage/page2'
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
// 해당화면이 사용자에게 보이는지 관찰해주는 API(icon에 사용)
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

/* -----Wrapper------ */
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
const Animationwrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 7%;
  margin-right: 7%;
`
const Animationwrapper2 = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 70vh;
  width: 80vw;
  margin: 0;
`
// 안의 animation을 페이지의 가운데에 위치시켜주기 위해 wrapper 생성
const Animationwrapper3 = styled.div`
  position: relative;
  padding-top: 10vh;
  padding-bottom: 10vh;
  height: 50vh;
  width: 60vw;
  margin: 0;
`
// 게이지바를 페이지 안의 중앙에 위치시키면서 왼쪽에서 오른쪽으로 가는 애니메이션을 구현하기 위해 wrapper 추가
const GuagebarContainer = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 0.7rem;
  width: 29.6rem;
  z-index: 4;

  @media (max-width: 756px) {
    top: 60%;
  }
`
const Arrowwrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 20vh;
  width: 99vw;
`

// keyframes
const slideUpFade = keyframes`
  0%{
    opacity: 0;
    transform: translateY(2rem);
  }
  100%{
    opacity: 1;
    transform: trasnlateY(0);
  }
`
const move = keyframes`
  0%{
    transform: translate(-50%, -50%) translateX(0);
  }
  100%{
    transform: translate(-50%, -50%) translateX(12.5rem);
  }
`
const movedocument = keyframes`
  0%{
    transform: translate(-50%, -50%) translateX(-12.5rem);
    opacity:0;
  }
  88%{
    transform: translate(-50%, -50%) translateX(-12.5rem);
    opacity:0;
  }
  89%{
    transform: translate(-50%, -50%) translateX(-12.5rem);
    opacity:1;
  }
  100%{
    transform: translate(-50%, -50%) translateX(0);
    opacity:1;
  }
`
const openthebox = keyframes` 
  0%{
    opacity: 0;
  }
  19%{
    opacity: 0;
  }
  20%{
    opacity: 1;
  }
  57%{
    opacity: 1;
  }
  58%{
    opacity: 0;
  }
  79%{
    opacity: 0;
  }
  80%{
    opacity: 1;
  }
  99%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
  `
const vibration = keyframes`
  0%{
    transform: translate(-50%,-50%) rotate(4deg);
  }
  100%{
    transform: translateX(-50%,-50%) rotate(-3deg);
  }
  `
const progress = keyframes`
  0%{
    width: 0;
    z-index: 4;
  }
  100%{
    width: 100%;
    z-index: 4;
  }`

/* ----down-arrow animation----- */
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
          ${down_down} 1.2s ease-out infinite
        `
      : 'none'};
`

// Text
interface DontProps {
  fontSize?: string
  top?: string
  fontfamily?: string
  left?: string
  background?: string
  height?: string
  width?: string
  radius?: string
  border?: string
  littleFontSize?: string
}
const Dont = styled.div<
  DontProps & { visible: boolean; animationType: string; isDarkMode: boolean }
>`
  font-size: ${(props) => props.fontSize || '3rem'};
  font-weight: 400;
  font-family: ${(props) => props.fontfamily || 'DMSerifDisplay'};
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  top: ${(props) => props.top || '20rem'};
  left: ${(props) => props.left || '4rem'};
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
  height: ${(props) => props.height || 'none'};
  width: ${(props) => props.width || 'none'};
  border-radius: ${(props) => props.radius || 'none'};
  background-color: ${(props) => props.background || 'none'};
  border: ${(props) => props.border || 'none'};
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideUpFade} 1s  ease-out;
        `
      : 'none'};

  @media (max-width: 720px) {
    font-size: ${(props) => props.littleFontSize || props.fontSize || '2.5rem'};
  }
`
// Guagebar
const Guagebar = styled.div<{ visible: boolean; isDarkMode: boolean }>`
  height: 100%;
  border-radius: 6.5rem;
  background: #1c6ef3;
  border: #1c6ef3;
  animation: ${(props) =>
    props.visible
      ? css`
          ${progress} 8s ease-in-out forwards;
        `
      : 'none'};
`

// Page.svg
interface Page {
  top?: string
  left?: string
}
const Styledpage = styled.img<Page>`
  width: 47rem;
  height: 35rem;
  position: absolute;
  padding-top: 10vh;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;

  @media (max-width: 760px) {
    width: 40rem;
    height: 25rem;
    top: 36%;
  }
`

// icon(svg) : 정가운데에 있는 GTD logobox를 토대로 위치 재조정해줬습니다.
interface StylediconProps {
  top?: string
  left?: string
  width?: string
  height?: string
  zindex?: string
  delay?: string
  translate?: string
  littletop?: string
}
export const Styledicon = styled.img<StylediconProps & { visible: boolean; animationType: string }>`
  width: ${(props) => props.width || '6rem'};
  height: ${(props) => props.width || '6rem'};
  position: absolute;
  z-index: ${(props) => props.zindex || '3'};
  top: ${(props) => props.top || '47%'};
  left: ${(props) => props.left || '50%'};
  transform: ${(props) => props.translate && `translate(${props.translate})`};
  animation: ${(props) =>
    props.visible
      ? props.animationType === 'move'
        ? css`
            ${move} 0.5s ${props.delay || '1s'} ease-out 2;
          `
        : props.animationType === 'movedocument'
          ? css`
              ${movedocument} 7s forwards;
            `
          : props.animationType === 'openthebox'
            ? css`
                ${openthebox} 7s forwards;
              `
            : props.animationType === 'vibration'
              ? css`
                  ${vibration} 0.1s 4.5s 3;
                `
              : 'none'
      : 'none'};

  @media (max-width: 760px) {
    top: ${(props) => props.littletop || props.top || '36%'};
  }
`

// Publishing
export const Page4: React.FC = () => {
  const [ref, visible] = useOnScreen({ threshold: 0.01 })
  const [refi, visiblei] = useOnScreenImg({ threshold: 0.01 })
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  return (
    <Section>
      <TextWrapper>
        <Dont
          isDarkMode={isDarkMode}
          ref={ref}
          visible={visible}
          animationType="slideUpFade"
          top="10%">
          <Blue isDarkMode={isDarkMode}>&gt; </Blue>step 2;
        </Dont>
        <Dont
          isDarkMode={isDarkMode}
          ref={ref}
          visible={visible}
          top="9.5rem"
          left="6.2rem"
          fontSize="1.2rem"
          littleFontSize="1rem"
          fontfamily="monospace"
          animationType="slideUpFade">
          Automatically generate the document based on your URL
        </Dont>
      </TextWrapper>
      <Animationwrapper>
        <Animationwrapper2>
          <Animationwrapper3>
            <GuagebarContainer>
              <Guagebar isDarkMode={isDarkMode} visible={visible} ref={ref} />
            </GuagebarContainer>
            {/* *아이콘* */}
            <Styledicon
              src={isDarkMode ? githublogo_dark : githublogo}
              visible={false}
              left="calc(50% - 12.5rem)"
              translate="-50%,-50%"
              animationType="none"
              alt="githublogo"
            />
            <Styledicon
              src={isDarkMode ? logobox_dark : logobox}
              visible={visiblei}
              zindex="1"
              translate="-50%,-50%"
              animationType="vibration"
              alt="logobox"
            />
            <Styledicon
              src={isDarkMode ? logoboxopen_dark : logoboxopen}
              visible={visiblei}
              width="8.8rem"
              height="8.8rem"
              top="calc(47% - 0.1rem)"
              littletop="calc(36% - 0.1rem)"
              left="calc(50% - 0.4rem)"
              translate="-50%, -50%"
              zindex="2"
              animationType="openthebox"
              alt="logoboxopen"
            />
            <Styledicon
              src={isDarkMode ? documnet_dark : document}
              visible={visiblei}
              left="calc(50% + 12.5rem)"
              translate="-50%, -50%"
              width="5rem"
              height="5rem"
              animationType="movedocument"
              alt="document"
            />
            <Styledicon
              src={isDarkMode ? document1_dark : document1}
              visible={visiblei}
              left="calc(50% + 12.5rem)"
              translate="-50%, -50%"
              width="5rem"
              height="5rem"
              zindex="2"
              animationType="none"
              alt="document"
            />
            <Styledicon
              src={isDarkMode ? file_dark : file}
              visible={visiblei}
              top="calc(47% + 0.5rem)"
              littletop="calc(36% + 0.5rem)"
              left="calc(50% - 12.5rem)"
              translate="-50%,-50%"
              width="3.5rem"
              height="3.5rem"
              zindex="2"
              animationType="move"
              delay="3s"
              alt="file"
            />
            <Styledicon
              src={isDarkMode ? folder_dark : folder}
              visible={visiblei}
              top="calc(47% + 0.7rem)"
              littletop="calc(36% + 0.7rem)"
              left="calc(50% - 13rem)"
              translate="-50%, -50%"
              width="3.5rem"
              height="3.5rem"
              zindex="2"
              animationType="move"
              delay="2s"
              alt="folder"
            />
            <Styledicon
              src={isDarkMode ? bar_dark : bar}
              visible={false}
              top="75%"
              littletop="60%"
              left="50%"
              translate="-50%, -50%"
              height="1.5rem"
              width="30rem"
              animationType="none"
              alt="progress"
            />
          </Animationwrapper3>
          <Styledpage ref={refi} src={isDarkMode ? step2page_dark : step2page} alt="changepage" />
        </Animationwrapper2>
      </Animationwrapper>
      <Arrowwrapper>
        <Styledarrow src={down_arrow} animation alt="downarrow" />
      </Arrowwrapper>
    </Section>
  )
}
