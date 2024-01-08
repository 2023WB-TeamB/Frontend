import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const LocalFont = createGlobalStyle`
  @font-face {
    font-family: 'EB Garamond';
    src: url('../../fonts/EB Garamond Regular.ttf') format('truetype');
  }
`

const LabelDiv = styled.div`
  height: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextWrapper = styled.p`
  color: #000000;
  font-family: 'EB Garamond', serif;
  font-size: 18px;
  font-weight: 400;
  height: 20px;
  line-height: normal;
  margin: 0 auto;
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
