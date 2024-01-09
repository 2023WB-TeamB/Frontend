import React from 'react'
import styled from 'styled-components'
import Gitpage from '../../assets/images/MainPage/Gitpage.svg'
import gitodocpage from '../../assets/images/MainPage/gitodocpage.svg'
import { Dont } from '../../components/MainPage/page2'
import { MonoText } from '../../components/MainPage/page2'
import { Blue } from '../../components/MainPage/page2'

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

export const Page3: React.FC = () => {
  return (
    <div>
      <Dont fontSize="3rem" top="10%">
        <Blue>&gt; </Blue>step1;
      </Dont>
      <MonoText top="20%" left="8%">
        <Blue>&gt; </Blue>&ensp;Paste
      </MonoText>
      <Styledpage src={gitodocpage} top="11rem" left="34rem" alt="GiToDocpage" />
      <Styledpage src={Gitpage} alt="Githubpage" />
    </div>
  )
}
