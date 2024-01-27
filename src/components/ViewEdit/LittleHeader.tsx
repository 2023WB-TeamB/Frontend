import styled from 'styled-components'
import DarkModeIcon from '../../assets/images/moon.svg'
import WhiteModeIcon from '../../assets/images/sun.svg'
import { useDarkModeStore } from '../../store/store'

const StyledLittleHeader = styled.div`
  position: fixed;
  padding: 0.5rem;
  margin: 1rem;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 2;
`

const StyledButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`

const Icon = styled.img<{ isDarkMode: boolean }>`
  width: 1.6rem;
  height: 1.6rem;
  filter: ${(props) => (props.isDarkMode ? 'brightness(1)' : 'brightness(0)')};
  transition: ease 0.75s;
`

const LittleHeader = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore()

  return (
    <StyledLittleHeader>
      <StyledButton onClick={toggleDarkMode}>
        <Icon src={isDarkMode ? DarkModeIcon : WhiteModeIcon} isDarkMode={isDarkMode} />
      </StyledButton>
    </StyledLittleHeader>
  )
}

export default LittleHeader
