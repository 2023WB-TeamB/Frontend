import styled from "styled-components";
import DarkModeIcon from "../../assets/images/dark_mode.png"
import WhiteModeIcon from "../../assets/images/white_mode.png"
import { useDarkModeStore } from "../../store/store";

const StyledLittleHeader = styled.div`
    position: fixed;
    margin: 20px;
    top: 0;
    right: 0;
    width: 120px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
`

const StyledButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`

const Icon = styled.img<{ isDarkMode: boolean }>`
    width: 40px;
    height: 40px;
    filter: ${(props) => 
    props.isDarkMode
      ? 'brightness(1)'
      : 'brightness(0)'};
    transition: ease .75s;
`

const LittleHeader = () => {
    const { isDarkMode, toggleDarkMode } = useDarkModeStore()

    return (
        <StyledLittleHeader>
            <label>프로필</label>
            <StyledButton onClick={toggleDarkMode}>
                <Icon src={isDarkMode ? DarkModeIcon : WhiteModeIcon} isDarkMode={isDarkMode}></Icon>
            </StyledButton>
        </StyledLittleHeader>
    )
}

export default LittleHeader