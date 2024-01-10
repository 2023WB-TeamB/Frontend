import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import step2page from '../../assets/images/MainPage/step2page.svg'
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
}
const Styledpage = styled.img<Page>`
  width: 50rem;
  height: 30rem;
  position: absolute;
  top: ${(props) => props.top || '14rem'};
  left: ${(props) => props.left || '5rem'};
`

export const Page4: React.FC = () => {
  const [ref, visible] = useOnScreen({ threshold: 0.1 })

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
      <Styledpage src={step2page} alt="changepage" />
    </div>
  )
}
