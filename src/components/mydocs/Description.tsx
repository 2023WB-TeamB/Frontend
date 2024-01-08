import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const LocalFont = createGlobalStyle`
  @font-face {
    font-family: 'EB Garamond';
    src: url('../../fonts/EB Garamond Regular.ttf') format('truetype');
  }
`

const LabelDiv = styled.div`
  height: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextWrapper = styled.p`
  color: #000000;
  font-family: 'EB Garamond', serif;
  font-size: 16px;
  font-weight: 400;
  height: 30px;
  left: 0;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
`

export const Description: React.FC = () => {
  return (
    <LabelDiv>
      <LocalFont />
      <TextWrapper>
        Create your own amazing technical documents with just a Repository URL!
      </TextWrapper>
    </LabelDiv>
  )
}
