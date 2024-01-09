import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
  max-height: 70px;
  min-height: 60px;
  width: 50vw;
  max-width: 800px;
  min-width: 660px;
  margin-top: 2vh;
`

const StyledInput = styled.input`
  background-color: #ffffff;
  border: 1px solid rgb(165, 101, 224);
  border-radius: 65.5px;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  font-size: 16px;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  text-align: center;
`

export const URLInput: React.FC = () => {
  return (
    <Wrapper>
      <StyledInput type="text" placeholder="Please enter your GitHub repository URL here..." />
    </Wrapper>
  )
}

export default URLInput
