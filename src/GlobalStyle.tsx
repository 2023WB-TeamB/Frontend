import { createGlobalStyle } from 'styled-components'
import DMSerifDisplay from '../src/assets/fonts/DMSerifDisplay-Regular.ttf'

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "DMSerifDisplay";
        src: url(${DMSerifDisplay}) format("truetype");
    }`
