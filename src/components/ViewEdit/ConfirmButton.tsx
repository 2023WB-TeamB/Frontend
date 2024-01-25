import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore } from '../../store/store'

const StyledConfirmButton = styled.button<{ isDarkMode: boolean }>`
  width: 130px;
  height: 50px;
  border: 1px solid transparent;
  border-radius: 30px;
  background-image: ${(props) =>
    props.isDarkMode
      ? 'linear-gradient(#2c2c2c, #2c2c2c), linear-gradient(#fff, #fff)'
      : 'linear-gradient(#fff, #fff), linear-gradient(#202020, #202020)'};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: linear 0.5s;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};

  &:hover {
    background-image: ${(props) =>
      props.isDarkMode
        ? 'linear-gradient(#2c2c2c, #2c2c2c), linear-gradient(to bottom right, #76cae8, #ad51de)'
        : 'linear-gradient(#fff, #fff), linear-gradient(to bottom right, #76cae8, #ad51de)'};
    transition: linear 0.5s;
  }
`

interface ConfirmButtonProps {
  context: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ context, onClick }) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  return (
    <StyledConfirmButton onClick={onClick} isDarkMode={isDarkMode}>
      {context}
    </StyledConfirmButton>
  )
}

export default ConfirmButton
