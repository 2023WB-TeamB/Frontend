import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import gitodocpage2 from '../../assets/images/MainPage/gitodocpage2.svg'
import pointer from '../../assets/images/MainPage/pointer.svg'
import { Blue } from '../../components/MainPage/page2'
import { Styledicon } from '../../components/MainPage/page2'
import Register from '../Register'

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
function useOnScreenImg2(
  options: IntersectionObserverInit,
): [MutableRefObject<HTMLButtonElement | null>, boolean] {
  const ref = useRef<HTMLButtonElement | null>(null)
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
    transform: translateY(2rem);
  }
  100%{
    opacity: 1;
    transform: trasnlateY(0);
  }
`
const slideinFade = keyframes`
  0%{
    opacity: 0;
    transform: translateX(3rem);
  }
  100%{
    opacity: 1;
    transform: translateX(0)
  }
`

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

interface Page {
  top?: string
  left?: string
  width?: string
  height?: string
}
const Styledpage = styled.img<Page & { visible: boolean }>`
  width: ${(props) => props.width || '50rem'};
  height: ${(props) => props.height || '30rem'};
  position: absolute;
  top: ${(props) => props.top || '14rem'};
  left: ${(props) => props.left || '5rem'};
  z-index: -2;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideinFade} 1s ease-out
        `
      : 'none'};
`

const Startbutton = styled.button<{ visible: boolean }>`
  position: relative;
  border: #d3e2fd;
  background-color: #d3e2fd;
  border-radius: 4.09rem;
  top: 33rem;
  left: 44rem;
  height: 4rem;
  width: 20rem;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 300;
  color: #1a1a1a;
  overflow: hidden;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideinFade} 1s ease-out
        `
      : 'none'};
  z-index: 0;
  &:before {
    content: '';
    position: absolute;
    top: -0.01rem;
    left: -0.01rem;
    right: -0.01rem;
    bottom: -0.01rem;
    background: linear-gradient(270deg, rgb(208, 166, 236) 0%, rgb(183, 225, 242) 100%);
    border-radius: 4.09rem;
    z-index: -2;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #edeff6;
    border-radius: 4.09rem;
    z-index: -1;
    transition: all 0.3s ease-in-out;
  }
  &:hover:after {
    top: 4rem;
    left: 4rem;
    right: 4rem;
    bottom: 4rem;
  }
`

export const Page5: React.FC = () => {
  const [ref, visible] = useOnScreen({ threshold: 0.01 })
  const [refi, visiblei] = useOnScreenImg({ threshold: 0.01 })
  const [refp, visiblep] = useOnScreenImg2({ threshold: 0.01 })

  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const handleRegisterOpen = () => {
    setIsRegisterOpen(true)
  }
  const handleRegisterClose = () => {
    setIsRegisterOpen(false)
  }

  return (
    <div>
      <Dont ref={ref} visible={visible} fontSize="3rem" top="10%">
        <Blue>&gt; </Blue>step 3;
      </Dont>
      <Dont
        ref={ref}
        visible={visible}
        top="10.4rem"
        left="6.2rem"
        fontSize="1.2rem"
        fontfamily="monospace">
        Check your document
      </Dont>
      <Styledicon src={pointer} top="35rem" left="60rem" alt="pointer" />
      <Startbutton ref={refp} visible={visiblep} onClick={handleRegisterOpen}>
        Sign up and get started!
      </Startbutton>
      <Register isOpen={isRegisterOpen} onClose={handleRegisterClose} />
      <Styledpage
        src={gitodocpage2}
        top="6rem"
        left="25rem"
        width="55rem"
        height="40rem"
        alt="gitodocpage"
        ref={refi}
        visible={visiblei}
      />
    </div>
  )
}
