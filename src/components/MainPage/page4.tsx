import React from 'react'
import styled from 'styled-components'
import step2page from '../../assets/images/MainPage/step2page.svg'
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
  top: ${(props) => props.top || '14rem'};
  left: ${(props) => props.left || '5rem'};
`

export const Page4: React.FC = () => {
  return (
    <div>
      <Dont fontSize="3rem" top="10%">
        <Blue>&gt; </Blue>step2;
      </Dont>
      <MonoText top="20%" left="8%">
        <Blue>&gt; </Blue>&ensp;Automatically generate the document based on your URL
      </MonoText>
      <Styledpage src={step2page} alt="changepage" />
    </div>
  )
}
