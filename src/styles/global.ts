import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Inter';
        font-style: normal;
        src: url("../assets/fonts/Inter-VariableFont_slnt,wght.ttf") format('truetype');
    }
    @font-face {
        font-family: 'Mono';
        font-style: normal;
        src: url("../assets/fonts/andale-mono.ttf") format('truetype');
    }
    @font-face {
        font-family: 'DMSerif';
        font-style: normal;
        src: url("../assets/fonts/DMSerifDisplay-Regular.ttf") format('truetype');
    }`

export default GlobalStyle
