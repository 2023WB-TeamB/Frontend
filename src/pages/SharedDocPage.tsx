import styled from 'styled-components'
/*-----------------------------------------------------------*/
import SharedDocField from '../components/ViewEdit/SharedDocField'
import LittleHeader from '../components/ViewEdit/LittleHeader'
import { useDarkModeStore } from '../store/store'

const StyledForm = styled.div<{ $isDarkMode: boolean }>`
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => (props.$isDarkMode ? '#202020' : 'white')};
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  transition: ease 0.5s;
  overflow: hidden;
`

const StyledDocFieldWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

function SharedDocViewer() {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  return (
    <StyledForm $isDarkMode={$isDarkMode}>
      <LittleHeader />
      <StyledDocFieldWrapper>
        <SharedDocField />
      </StyledDocFieldWrapper>
    </StyledForm>
  )
}

export default SharedDocViewer
