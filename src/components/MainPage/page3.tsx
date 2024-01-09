import React from 'react'
import styled from 'styled-components'
import Gitpage from '../../assets/images/MainPage/Gitpage.svg'
import gitodocpage from '../../assets/images/MainPage/gitodocpage.svg'
import { Dont } from '../../pages/MainPage'
import { MonoText } from '../../pages/MainPage'
import { Blue } from '../../pages/MainPage'

interface Page {
  top?: string
  left?: string
}

const Styledpage = styled.img<Page>`
  width: 50rem;
  height: 30rem;
  position: absolute;
  top: ${(props) => props.top || '30%'};
  left: ${(props) => props.left || '30%'};
`

export const Page3: React.FC = () => {
  return (
    <div>
      <Dont font-size="3rem">
        <Blue>&gt; </Blue>step1;
      </Dont>
      <MonoText top="27%" left="8%">
        <Blue>&gt; </Blue>&ensp;Paste
      </MonoText>
      <Styledpage src={gitodocpage} alt="GiToDocpage" />
      <Styledpage src={Gitpage} top="40%" left="40%" alt="Githubpage" />
    </div>
  )
}
