import { createGlobalStyle } from 'styled-components'
import DMSerif from './assets/fonts/DMSerifDisplay-Regular.ttf'
import Inter from './assets/fonts/Inter-VariableFont_slnt,wght.ttf'

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Inter';
        font-style: normal;
        src: url(${Inter}) format("truetype");
    }
    @font-face {
        font-family: 'DMSerif';
        font-style: normal;
        src: url(${DMSerif}) format("truetype");
    }
    `
