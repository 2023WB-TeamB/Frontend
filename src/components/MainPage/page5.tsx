import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import gitodocpage2 from '../../assets/images/MainPage/gitodocpage2.svg'
import gitodocpage2_dark from '../../assets/images/MainPage/gitodocpage2_dark.svg'
import pointer from '../../assets/images/MainPage/pointer.svg'
import { Blue } from '../../components/MainPage/page2'
import { Styledicon } from '../../components/MainPage/page2'
import { useDarkModeStore } from '../../store/store'
import Register from '../Register'
import useModalStore from '../useModalStore'

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
//해당화면이 사용자에게 보이는지 관찰해주는 API(Page.svg에 사용)
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
//해당화면이 사용자에게 보이는지 관찰해주는 API(Button에 사용)
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

//Text
interface DontProps {
  fontSize?: string
  top?: string
  fontfamily?: string
  left?: string
}
const Dont = styled.h1<DontProps & { visible: boolean; isDarkMode: boolean }>`
  font-size: ${(props) => props.fontSize || '4rem'};
  font-weight: 400;
  font-family: ${(props) => props.fontfamily || 'DMSerifDisplay'};
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  position: absolute;
  top: ${(props) => props.top || '20rem'};
  left: ${(props) => props.left || '4rem'};
  letter-spacing: 0;
  line-height: 150%;
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
  width?: string
  height?: string
}
const Styledpage = styled.img<Page & { visible: boolean }>`
  width: ${(props) => props.width || '50rem'};
  height: ${(props) => props.height || '30rem'};
  position: absolute;
  top: ${(props) => props.top || '14rem'};
  left: ${(props) => props.left || '5rem'};
  z-index: 0;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideinFade} 1s ease-out
        `
      : 'none'};
`

//Button
const Startbutton = styled.button<{ visible: boolean; isDarkMode: boolean }>`
  position: relative;
  border-radius: 4.09rem;
  top: 33rem;
  left: 44rem;
  height: 4rem;
  width: 20rem;
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  font-family: 'Inter', Helvetica;
  font-size: 1rem;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  background-image: linear-gradient(to right, #79c5e8, #a26be1, #79c5e8);
  box-shadow: 0 0 1rem ${(props) => (props.isDarkMode ? '#202020' : '#eee')};
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideinFade} 1s ease-out
        `
      : 'none'};
  z-index: 1;

  &:hover {
    background-position: right center;
  }
`

//Publishing
export const Page5: React.FC = () => {
  const [ref, visible] = useOnScreen({ threshold: 0.01 })
  const [refi, visiblei] = useOnScreenImg({ threshold: 0.01 })
  const [refp, visiblep] = useOnScreenImg2({ threshold: 0.01 })
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  //Register modal
  const { isRegisterOpen, toggleRegister } = useModalStore()
  // const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const handleRegisterOpen = () => {
    toggleRegister()
  }
  // const handleRegisterClose = () => {
  //   setIsRegisterOpen(false)
  // }

  return (
    <div>
      <Dont isDarkMode={isDarkMode} ref={ref} visible={visible} fontSize="3rem" top="10%">
        <Blue isDarkMode={isDarkMode}>&gt; </Blue>step 3;
      </Dont>
      <Dont
        isDarkMode={isDarkMode}
        ref={ref}
        visible={visible}
        top="10.4rem"
        left="6.2rem"
        fontSize="1.2rem"
        fontfamily="monospace">
        Check your document, <br />
        Refine your document
      </Dont>
      <Styledicon src={pointer} top="35rem" left="60rem" alt="pointer" />
      <Startbutton
        isDarkMode={isDarkMode}
        ref={refp}
        visible={visiblep}
        onClick={handleRegisterOpen}>
        Click here to Sign up for GiToDoc!
      </Startbutton>
      {/* 모달 isOpen Props를 삭제해서 코드 수정했습니다 -희수- */}
      {isRegisterOpen && <Register />}
      <Styledpage
        src={isDarkMode ? gitodocpage2_dark : gitodocpage2}
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
