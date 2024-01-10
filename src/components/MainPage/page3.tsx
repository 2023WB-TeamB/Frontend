import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import Gitpage from '../../assets/images/MainPage/Gitpage.svg'
import gitodocpage from '../../assets/images/MainPage/gitodocpage.svg'
import pointer from '../../assets/images/MainPage/pointer.svg'
import { Blue } from '../../components/MainPage/page2'
import { Styledicon } from '../../components/MainPage/page2'

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
    transform: translateX(50rem);
  }
  80%{
    opacity:0.3;
    transform: translateX(45rem);
  }
  90%{opacity:0.5;
    transform: translateX(40rem);
  }
  100%{
    opacity: 1;
    transform: translateX(0)
  }`

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
  z-index: 1;
  line-height: normal;
  white-space: nowrap;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideUpFade} 1s ease-in-out
        `
      : 'none'};
`

interface Page {
  top?: string
  left?: string
  zindex?: string
}

const Styledpage = styled.img<Page & { visible: boolean }>`
  width: 47rem;
  height: 27rem;
  position: absolute;
  z-index: ${(props) => props.zindex || '2'};
  top: ${(props) => props.top || '16rem'};
  left: ${(props) => props.left || '6rem'};
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideinFade} 5s ease-out
        `
      : 'none'};
`

export const Page3: React.FC = () => {
  const [refd, visibled] = useOnScreenDiv({ threshold: 0.01 })
  const [refi, visiblei] = useOnScreenImg({ threshold: 0.01 })

  return (
    <div>
      <Dont ref={refd} visible={visibled} fontSize="3rem" top="10%">
        <Blue>&gt; </Blue>step 1;
      </Dont>
      <Dont
        ref={refd}
        visible={visibled}
        top="10.4rem"
        left="6.2rem"
        fontSize="1.2rem"
        fontfamily="monospace">
        Copy your repository URL
      </Dont>
      <Dont visible={false} fontSize="1rem" top="16.45rem" left="22rem" fontfamily="Inter">
        https://github.com/2023WB-TeamB'
      </Dont>
      <Styledicon src={pointer} alt="pointer" />
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
