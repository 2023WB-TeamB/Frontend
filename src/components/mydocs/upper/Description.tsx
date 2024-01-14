import React from 'react'
import { useDarkModeStore } from '../../../store/store'
import styled from 'styled-components'

const LabelDiv = styled.div`
  height: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.1rem;
`

const TextWrapper = styled.p<{ isDarkMode: boolean }>`
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  height: 20px;
  line-height: normal;
`

export const Description: React.FC = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  return (
    <LabelDiv>
      <TextWrapper isDarkMode={isDarkMode}>
        Create your own amazing technical documents with just a Repository URL!
      </TextWrapper>
    </LabelDiv>
  )
}
export default Description
