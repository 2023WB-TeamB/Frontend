import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import Gitpage from '../../assets/images/MainPage/Gitpage.svg'
import gitodocpage from '../../assets/images/MainPage/gitodocpage.svg'
import pointer from '../../assets/images/MainPage/pointer.svg'
import { Blue } from '../../components/MainPage/page2'

//해당화면이 사용자에게 보이는지 관찰해주는 API(Dont에 사용)
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
//해당화면이 사용자에게 보이는지 관찰해주는 API(svg에 사용)
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

//keyframes 애니메이션
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
    transform: translateX(-32rem) translateY(-11rem);
  }
  100% {
    transform: translateX(0) translateY(0);
  }
  `
const moveURL = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }
  100%{
    transform: translateX(30rem) translateY(11.2rem);
  }
`
const pasteURL = keyframes`
  0%{
    opacity: 0;
  }
  99%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }`

//Text
interface DontProps {
  fontSize?: string
  top?: string
  fontfamily?: string
  left?: string
  delay?: string
}
const Dont = styled.h1<DontProps & { visible: boolean; animationType: string }>`
  font-size: ${(props) => props.fontSize || '4rem'};
  font-weight: 400;
  font-family: ${(props) => props.fontfamily || 'DMSerifDisplay'};
  color: #000000;
  position: absolute;
  top: ${(props) => props.top || '20rem'};
  left: ${(props) => props.left || '4rem'};
  letter-spacing: 0;
  z-index: 2;
  line-height: normal;
  white-space: nowrap;
  animation: ${(props) =>
    props.visible
      ? props.animationType === 'slideUpFade'
        ? css`
            ${slideUpFade} 1s ease-out
          `
        : props.animationType === 'moveURL'
        ? css`
            ${moveURL} 0.77s ease-out forwards
          `
        : props.animationType === 'pasteURL'
        ? css`
            ${pasteURL} 4.5s
          `
        : 'none'
      : 'none'};
  animation-delay: ${(props) => props.delay || 'none'};
`

//Page (GitPage+gitodoc)
interface Page {
  top?: string
  left?: string
  zindex?: string
}
const Styledpage = styled.img<Page & { visible: boolean }>`
  width: 47rem;
  height: 27rem;
  position: absolute;
  z-index: ${(props) => props.zindex || '1'};
  top: ${(props) => props.top || '16rem'};
  left: ${(props) => props.left || '6rem'};
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideinFade} 2.5s ease-out
        `
      : 'none'};
`

//pointer
const Styledpointer = styled.img<{ visible: boolean }>`
  width: 5rem;
  height: 3rem;
  position: absolute;
  z-index: 2;
  top: 28rem;
  left: 66rem;
  animation: ${(props) =>
    props.visible
      ? css`
          ${movePointer} 2s ease-out
        `
      : 'none'};
  animation-delay: 2.5s;
`

//Publishing
export const Page3: React.FC = () => {
  const [refd, visibled] = useOnScreenDiv({ threshold: 0.01 }) //threshold 비율이 보이는 순간 애니메이션
  const [refi, visiblei] = useOnScreenImg({ threshold: 0.01 })
  const [refp, visiblep] = useOnScreenImg({ threshold: 1 })

  return (
    <div>
      <Dont ref={refd} visible={visibled} animationType="slideUpFade" fontSize="3rem" top="10%">
        <Blue>&gt; </Blue>step 1;
      </Dont>
      <Dont
        ref={refd}
        visible={visibled}
        animationType="slideUpFade"
        top="10.4rem"
        left="6.2rem"
        fontSize="1.2rem"
        fontfamily="monospace">
        Copy your repository URL
      </Dont>
      <Dont
        ref={refd}
        visible={visibled}
        animationType="moveURL"
        delay="3.7s"
        fontSize="1rem"
        top="16.45rem"
        left="22rem"
        fontfamily="Inter">
        https://github.com/2023WB-TeamB
      </Dont>
      <Styledpointer ref={refp} visible={visiblep} src={pointer} alt="pointer" />
      <Dont
        ref={refd}
        visible={visibled}
        animationType="pasteURL"
        fontSize="1rem"
        top="27.65rem"
        left="52rem"
        fontfamily="Inter">
        https://github.com/2023WB-TeamB
      </Dont>
      <Styledpage
        src={gitodocpage}
        top="11rem"
        left="36rem"
        alt="GiToDocpage"
        ref={refi}
        visible={visiblei}
      />
      <Styledpage src={Gitpage} alt="Githubpage" visible={false} zindex="0" />
    </div>
  )
}
