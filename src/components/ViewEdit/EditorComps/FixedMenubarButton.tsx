import styled from 'styled-components'
import { useDarkModeStore } from '../../../store/store'

const StyledButton = styled.button<{ $isDarkMode: boolean }>`
  height: 45px;
  border: none;
  border-radius: 0px;
  background-color: transparent;
  font-size: 12px;
  transition: all ease 0.2s;
  color: black;

  &:hover {
    background-color: ${(props) => (props.$isDarkMode ? '#484848' : 'lightgray')};
  }
  @media (max-width: 980px) {
    padding: 0;
    min-width: 30px;
    width: 5vw;
    height: 45px;
    transition: ease-in-out 0.2s;
  }
`

const Icon = styled.img`
  height: 2rem;
`

interface FixedMenubarProps {
  icon: string
  disable?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const FixedMenubarButton: React.FC<FixedMenubarProps> = ({ icon, disable, onClick }) => {
  const { $isDarkMode } = useDarkModeStore()
  return (
    <StyledButton $isDarkMode={$isDarkMode} disabled={disable} onClick={onClick}>
      <Icon src={icon} alt={icon} />
    </StyledButton>
  )
}

export default FixedMenubarButton
