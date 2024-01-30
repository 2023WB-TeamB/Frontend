import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore } from '../../store/store'

const StyledBackDrop = styled.div<{ $isDarkMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.$isDarkMode ? 'rgba(32, 32, 32, 0.50)' : 'rgba(255, 255, 255, 0.7)'};
  z-index: 999;
`

const BackDrop: React.FC = () => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)

  return <StyledBackDrop $isDarkMode={$isDarkMode} />
}

export default BackDrop
