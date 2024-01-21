import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import gitodocpage2 from '../../assets/images/MainPage/gitodocpage2.svg'
import gitodocpage2_dark from '../../assets/images/MainPage/gitodocpage2_dark.svg'
import pointer from '../../assets/images/MainPage/pointer.svg'
import { Blue } from '../../components/MainPage/page2'
import { Styledicon } from '../../components/MainPage/page4'
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

/*-----Wrapper------*/
const Section = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  margin-bottom: 0;
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
  height: 75vh;
  width: 80vw;
  margin: 0;
`

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
    transform: translate(-50%, -50%) translateX(3rem);
  }
  100%{
    opacity: 1;
    transform: translate(-50%, -50%) translateX(0);
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
const Dont = styled.h1<DontProps & { visible: boolean; isDarkMode: boolean }>`
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

  @media (max-width: 720px) {
    font-size: ${(props) => props.littleFontSize || props.fontSize || '2.5rem'};
  }
`
//Page.svg
interface Page {
  top?: string
  left?: string
  width?: string
  height?: string
}
const Styledpage = styled.img<Page & { visible: boolean }>`
  width: 55rem;
  height: 31rem;
  position: absolute;
  top: 45%;
  left: 60%;
  transform: translate(-50%, -50%);
  z-index: 0;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideinFade} 1s ease-out
        `
      : 'none'};

  @media (max-width: 720px) {
    widht: 40rem;
    height: 22rem;
    top: 30%;
    left: 50%;
  }
`

//Button
const Startbutton = styled.button<{ visible: boolean; isDarkMode: boolean }>`
  position: absolute;
  border-radius: 4.09rem;
  top: 62%;
  left: 62%;
  transform: translate(-50%, -50%);
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

  @media (max-width: 720px) {
    width: 16rem;
    heiht: 3rem;
    top: 45%;
    font-size: 0.9rem;
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
  const handleRegisterOpen = () => {
    toggleRegister()
  }

  return (
    <Section>
      <TextWrapper>
        <Dont isDarkMode={isDarkMode} ref={ref} visible={visible}>
          <Blue isDarkMode={isDarkMode}>&gt; </Blue>step 3;
        </Dont>
        <Dont
          isDarkMode={isDarkMode}
          ref={ref}
          visible={visible}
          top="10.4rem"
          left="6.2rem"
          fontSize="1.2rem"
          littleFontSize="1rem"
          fontfamily="monospace">
          Check your document, Refine your document
        </Dont>
      </TextWrapper>
      <Animationwrapper>
        <Animationwrapper2>
          <Styledicon
            visible={false}
            animationType="none"
            src={pointer}
            width="3rem"
            height="3rem"
            translate="-50%, -50%"
            top="65%"
            left="75%"
            alt="pointer"
          />
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
            alt="gitodocpage"
            ref={refi}
            visible={visiblei}
          />
        </Animationwrapper2>
      </Animationwrapper>
    </Section>
  )
}
