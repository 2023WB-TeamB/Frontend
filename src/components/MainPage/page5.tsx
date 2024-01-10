import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import gitodocpage2 from '../../assets/images/MainPage/gitodocpage2.svg'
import { Blue } from '../../components/MainPage/page2'

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

const Startbutton = styled.button`
  position: relative;
  border: none;
  background-color: #ffffff;
  border-radius: 4.09rem;
  top: 33rem;
  left: 44rem;
  height: 4rem;
  width: 20rem;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 200;
  color: #1a1a1a;
  overflow: hidden;
  z-index: 0;
  &:before {
    content: '';
    position: absolute;
    top: -0.063rem;
    left: -0.063rem;
    right: -0.063rem;
    bottom: -0.063rem;
    background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
    border-radius: 4.09rem;
    z-index: -1;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    border-radius: 4.09rem;
    z-index: 1;
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
      <Startbutton>Sign up and get started!</Startbutton>
      <Styledpage
        src={gitodocpage2}
        top="8rem"
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
