import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore } from '../../store/store'

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin: 10px 0px 10px 25px;
`

const StyledButton = styled.button<{ isDarkMode: boolean }>`
  position: relative;
  width: 260px;
  height: 60px;
  min-height: 45px;
  border: 0.5px solid transparent;
  border-radius: 60px;
  transition: 0.5s;
  background-size: 200% auto;
  background-image: linear-gradient(to right, #7cc0e8, #a565e0, #7cc0e8);
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
    color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  }

  &:hover {
    background-position: right center;
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
