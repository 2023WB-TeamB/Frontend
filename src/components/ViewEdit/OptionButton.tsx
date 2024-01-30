import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore } from '../../store/store'

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin: 10px 0px 10px 25px;
`

const StyledButton = styled.button<{ $isDarkMode: boolean }>`
  position: relative;
  width: 260px;
  height: 60px;
  min-height: 45px;
  border: 0.9px solid transparent;
  border-radius: 60px;
  transition: linear 0.5s;
  background-image: ${(props) =>
    props.$isDarkMode
      ? 'linear-gradient(#2c2c2c, #2c2c2c), linear-gradient(#5e5e5e,#5e5e5e)'
      : 'linear-gradient(#fff, #fff), linear-gradient(#c8c8c8,#c8c8c8)'};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;

  & p {
    margin-right: 20px;
    width: 100%;
    text-align: center;
    color: ${(props) => (props.$isDarkMode ? 'white' : '#202020')};
  }

  &:hover {
    background-image: ${(props) =>
      props.$isDarkMode
        ? 'linear-gradient(#2c2c2c, #2c2c2c), linear-gradient(to bottom right, #76cae8, #ad51de)'
        : 'linear-gradient(#fff, #fff), linear-gradient(to bottom right, #76cae8, #ad51de)'};
  }
`

interface OptionProps {
  icon: string
  context: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const OptionButton: React.FC<OptionProps> = ({ icon, context, onClick }) => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)

  return (
    <StyledButton $isDarkMode={$isDarkMode} onClick={onClick}>
      <Icon src={icon} />
      <p>{context}</p>
    </StyledButton>
  )
}

export default OptionButton
