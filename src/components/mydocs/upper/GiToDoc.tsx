import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../../../GlobalStyle'

const Main = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  width: 30rem;
  margin-top: 0.5vh;
  text-align: center;
  font-size: 8rem;
  font-weight: 700;
  font-family: 'DMSerifDisplay', serif;
  color: transparent;
  background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
  background-clip: text;
  -webkit-background-clip: text;
`
const Smalli = styled.div`
  margin-top: 1rem;
  font-size: 7rem;
`

const GiToDoc: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Main>
        G<Smalli>i</Smalli>ToDoc
      </Main>
    </>
  )
}

export default GiToDoc
