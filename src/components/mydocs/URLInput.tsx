import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 680px;
  margin-top: 25px;
`

const StyledInput = styled.input`
  background-color: #ffffff;
  border: 1px solid rgb(165, 101, 224);
  border-radius: 65.5px;
  height: 100%;
  width: 80vw;
  padding: 0 20px;
  font-size: 16px;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  text-align: center;
`

export const URLInput: React.FC = () => {
  return (
    <Box>
      <StyledInput type="text" placeholder="Please enter your GitHub repository URL here..." />
    </Box>
  )
}
