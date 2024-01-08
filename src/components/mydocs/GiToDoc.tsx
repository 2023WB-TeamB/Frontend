import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const LocalFont = createGlobalStyle`
  @font-face {
    font-family: 'DM Serif Display';
    src: url('../../fonts/DMSerifDisplay-Regular.ttf') format('truetype');
  }
`

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  width: 600px;
  text-align: center;
  background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 150px;
  font-weight: 400;
  font-family: 'DM Serif Display', serif;
  margin-top: 10vh;
`

const GiToDoc: React.FC = () => {
  return (
    <>
      <LocalFont />
      <StyledDiv>GiToDoc</StyledDiv>
    </>
  )
}

export default GiToDoc
