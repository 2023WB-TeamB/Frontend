import React from 'react'
import styled from 'styled-components'
import gitodocpage2 from '../../assets/images/MainPage/gitodocpage2.svg'
import { Dont } from '../../pages/MainPage'
import { MonoText } from '../../pages/MainPage'
import { Blue } from '../../pages/MainPage'

interface Page {
  top?: string
  left?: string
  width?: string
  height?: string
}

const Styledpage = styled.img<Page>`
  width: ${(props) => props.width || '50rem'};
  height: ${(props) => props.height || '30rem'};
  position: absolute;
  top: ${(props) => props.top || '14rem'};
  left: ${(props) => props.left || '5rem'};
  z-index: -2;
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
  return (
    <div>
      <Dont fontSize="3rem" top="10%">
        <Blue>&gt; </Blue>step3;
      </Dont>
      <MonoText top="20%" left="8%">
        <Blue>&gt; </Blue>&ensp;Check your document
      </MonoText>
      <Startbutton>Sign up and get started!</Startbutton>
      <Styledpage
        src={gitodocpage2}
        top="8rem"
        left="25rem"
        width="55rem"
        height="40rem"
        alt="gitodocpage"
      />
    </div>
  )
}
