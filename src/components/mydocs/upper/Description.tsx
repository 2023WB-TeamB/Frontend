import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useDarkModeStore } from '../../../store/store'

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

const TextWrapper = styled.p<{ isDarkMode: boolean }>`
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  font-family: 'EB Garamond', serif;
  font-size: 18px;
  font-weight: 400;
  height: 20px;
  line-height: normal;
  margin: 0 auto;
`

export const Description: React.FC = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  return (
    <LabelDiv>
      <LocalFont />
      <TextWrapper isDarkMode={isDarkMode}>
        Create your own amazing technical documents with just a Repository URL!
      </TextWrapper>
    </LabelDiv>
  )
}
export default Description
