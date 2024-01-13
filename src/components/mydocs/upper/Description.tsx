import React from 'react'
import styled from 'styled-components'

const LabelDiv = styled.div`
  height: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1vh;
`

const TextWrapper = styled.p`
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  height: 20px;
  line-height: normal;
`

export const Description: React.FC = () => {
  return (
    <LabelDiv>
      <TextWrapper>
        Create your own amazing technical documents with just a Repository URL!
      </TextWrapper>
    </LabelDiv>
  )
}
export default Description
