import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import step2page from '../../assets/images/MainPage/step2page.svg'
import githublogo from '../../assets/images/MainPage/githublogo.svg'
import file from '../../assets/images/MainPage/file.svg'
import folder from '../../assets/images/MainPage/folder.svg'
import logobox from '../../assets/images/MainPage/logobox.svg'
import logoboxopen from '../../assets/images/MainPage/logoboxopen.svg'
import document from '../../assets/images/MainPage/document.svg'
import document1 from '../../assets/images/MainPage/document1.svg'
import bar from '../../assets/images/MainPage/bar.svg'
import { Blue } from '../../components/MainPage/page2'

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
//해당화면이 사용자에게 보이는지 관찰해주는 API(icon에 사용)
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

//keyframes
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
    transform: translateX(0);
  }
  100%{
    transform: translateX(12.5rem);
  }
`
const movedocument = keyframes`
  0%{
    transform: translateX(-13.5rem);
    opacity:0;
  }
  88%{
    transform: translateX(-13.5rem);
    opacity:0;
  }
  89%{
    transform: translateX(-13.5rem);
    opacity:1;
  }
  100%{
    transform: translateX(0);
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
    transform: rotate(4deg);
  }
  100%{
    transform: rotate(-3deg);
  }
  `
const progress = keyframes`
  0%{
    height: 0.7rem;
    width: 2rem;
    z-index: 4;
  }
  100%{
    height: 0.7rem;
    width: 29.55rem;
    z-index: 4;
  }`

//Text & Progress bar
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
}
const Dont = styled.div<DontProps & { visible: boolean; animationType: string }>`
  position: absolute;
  font-size: ${(props) => props.fontSize || '4rem'};
  font-weight: 400;
  font-family: ${(props) => props.fontfamily || 'DMSerifDisplay'};
  color: #000000;
  position: absolute;
  top: ${(props) => props.top || '20rem'};
  left: ${(props) => props.left || '4rem'};
  z-index = 20;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
  height= ${(props) => props.height || 'none'};
  width= ${(props) => props.width || 'none'};
  border-radius : ${(props) => props.radius || 'none'};
  background-color: ${(props) => props.background || 'none'};
  border : ${(props) => props.border || 'none'};
  animation: ${(props) =>
    props.visible
      ? props.animationType === 'slideUpFade'
        ? css`
            ${slideUpFade} 1s  ease-out;
          `
        : props.animationType === 'progress'
        ? css`
            ${progress} 9s ease-in-out forwards;
          `
        : 'none'
      : 'none'};
    `

//Page.svg
interface Page {
  top?: string
  left?: string
}
const Styledpage = styled.img<Page>`
  width: 47rem;
  height: 35rem;
  position: absolute;
  top: 10rem;
  left: 21.5rem;
  z-index: 0;
`

//icon(svg)
interface Styledicon {
  top?: string
  left?: string
  width?: string
  height?: string
  zindex?: string
  delay?: string
}
const Styledicon = styled.img<Styledicon & { visible: boolean; animationType: string }>`
  width: ${(props) => props.width || '6rem'};
  height: ${(props) => props.width || '6rem'};
  position: absolute;
  z-index: ${(props) => props.zindex || '3'};
  top: ${(props) => props.top || '22.5rem'};
  left: ${(props) => props.left || '41rem'};
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
`

//Publishing
export const Page4: React.FC = () => {
  const [ref, visible] = useOnScreen({ threshold: 0.01 })
  const [refi, visiblei] = useOnScreenImg({ threshold: 0.01 })

  return (
    <div>
      <Dont ref={ref} visible={visible} animationType="slideUpFade" fontSize="3rem" top="10%">
        <Blue>&gt; </Blue>step 2;
      </Dont>
      <Dont
        ref={ref}
        visible={visible}
        top="9.5rem"
        left="6.2rem"
        fontSize="1.2rem"
        fontfamily="monospace"
        animationType="slideUpFade">
        Automatically generate the document based on your URL
      </Dont>
      <Dont
        visible={visible}
        ref={ref}
        top="33.65rem"
        left="30rem"
        height="1rem"
        width="1rem"
        radius="6.5rem"
        background="#1C6EF3"
        border="#1C6EF3"
        animationType="progress"
      />
      {/**아이콘**/}
      <Styledicon
        src={githublogo}
        visible={false}
        top="22.5rem"
        left="28rem"
        animationType="none"
        alt="githublogo"
      />
      <Styledicon
        src={logobox}
        visible={visiblei}
        zindex="1"
        animationType="vibration"
        alt="logobox"
      />
      <Styledicon
        src={logoboxopen}
        visible={visiblei}
        width="8.8rem"
        height="8.8rem"
        top="21rem"
        left="39.2rem"
        zindex="2"
        animationType="openthebox"
        alt="logoboxopen"
      />
      <Styledicon
        src={document}
        visible={visiblei}
        top="23rem"
        left="55rem"
        width="5rem"
        height="5rem"
        animationType="movedocument"
        alt="document"
      />
      <Styledicon
        src={document1}
        visible={visiblei}
        top="23rem"
        left="55rem"
        width="5rem"
        height="5rem"
        zindex="2"
        animationType="none"
        alt="document"
      />
      <Styledicon
        src={file}
        visible={visiblei}
        top="24.25rem"
        left="29.5rem"
        width="3.5rem"
        height="3.5rem"
        zindex="2"
        animationType="move"
        delay="3s"
        alt="file"
      />
      <Styledicon
        src={folder}
        visible={visiblei}
        top="24.5rem"
        left="29.5rem"
        width="3.5rem"
        height="3.5rem"
        zindex="2"
        animationType="move"
        delay="2s"
        alt="folder"
      />
      <Styledicon
        src={bar}
        visible={false}
        top="19rem"
        left="29.8rem"
        height="1.5rem"
        width="30rem"
        animationType="none"
        alt="progress"
      />
      <Styledpage ref={refi} src={step2page} alt="changepage" />
    </div>
  )
}
