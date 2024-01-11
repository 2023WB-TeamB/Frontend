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
    transform: translateX(13.5rem);
  }
`
const movedocument = keyframes`
  0%{
    transform: translateX(-13.5rem);
    opacity:0;
  }
  93%{
    transform: translateX(-13.5rem);
    opacity:0;
  }
  94%{
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
  59%{
    opacity: 1;
  }
  60%{
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

//Text
interface DontProps {
  fontSize?: string
  top?: string
  fontfamily?: string
  left?: string
}
const Dont = styled.h1<DontProps & { visible: boolean }>`
  font-size: ${(props) => props.fontSize || '4rem'};
  font-weight: 400;
  font-family: ${(props) => props.fontfamily || 'DMSerifDisplay'};
  color: #000000;
  position: absolute;
  top: ${(props) => props.top || '20rem'};
  left: ${(props) => props.left || '4rem'};
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideUpFade} 1s ease-out
        `
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
  top: 11rem;
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
  top: ${(props) => props.top || '26rem'};
  left: ${(props) => props.left || '41rem'};
  animation: ${(props) =>
    props.visible
      ? props.animationType === 'move'
        ? css`
            ${move} 0.5s ${props.delay || '1s'} ease-out 2;
          `
        : props.animationType === 'movedocument'
        ? css`
            ${movedocument} 8s forwards;
          `
        : props.animationType === 'openthebox'
        ? css`
            ${openthebox} 8s forwards;
          `
        : props.animationType === 'vibration'
        ? css`
            ${vibration} 0.1s 5.5s 3;
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
      <Dont ref={ref} visible={visible} fontSize="3rem" top="10%">
        <Blue>&gt; </Blue>step 2;
      </Dont>
      <Dont
        ref={ref}
        visible={visible}
        top="10.4rem"
        left="6.2rem"
        fontSize="1.2rem"
        fontfamily="monospace">
        Automatically generate the document based on your URL
      </Dont>
      {/**아이콘**/}
      <Styledicon
        src={githublogo}
        visible={false}
        top="26rem"
        left="27rem"
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
        top="24.5rem"
        left="39.2rem"
        zindex="2"
        animationType="openthebox"
        alt="logoboxopen"
      />
      <Styledicon
        src={document}
        visible={visiblei}
        top="26.5rem"
        left="55rem"
        width="5rem"
        height="5rem"
        animationType="movedocument"
        alt="document"
      />
      <Styledicon
        src={document1}
        visible={visiblei}
        top="26.5rem"
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
        top="27.8rem"
        left="28.5rem"
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
        top="28rem"
        left="28.5rem"
        width="3.5rem"
        height="3.5rem"
        zindex="2"
        animationType="move"
        delay="2s"
        alt="folder"
      />
      <Styledpage ref={refi} src={step2page} alt="changepage" />
    </div>
  )
}
