import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore } from '../../store/store'

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin: 5px;
`

const StyledButton = styled.button<{ isDarkMode: boolean }>`
  position: relative;
  width: 280px;
  height: 60px;
  min-height: 45px;
  border: 1px solid transparent;
  border-radius: 50px;
  background-image: ${(props) =>
    props.isDarkMode
      ? 'linear-gradient(#2c2c2c, #2c2c2c), linear-gradient(#fff, #fff)'
      : 'linear-gradient(#fff, #fff), linear-gradient(#202020, #202020)'};
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: linear 0.5s;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;

  & p {
    margin-right: 5px;
    width: 100%;
    text-align: center;
    color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  }

  &:hover {
    background-image: ${(props) =>
      props.isDarkMode
        ? 'linear-gradient(#2c2c2c, #2c2c2c), linear-gradient(to bottom right, #76cae8, #ad51de)'
        : 'linear-gradient(#fff, #fff), linear-gradient(to bottom right, #76cae8, #ad51de)'};
    transition: linear 0.5s;
  }
`

interface OptionProps {
  icon?: string
  context?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const OptionButton: React.FC<OptionProps> = ({ icon, context, onClick }) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

  return (
    <StyledButton isDarkMode={isDarkMode} onClick={onClick}>
      <Icon src={icon}></Icon>
      <p>{context}</p>
    </StyledButton>
  )
}

export default OptionButton
