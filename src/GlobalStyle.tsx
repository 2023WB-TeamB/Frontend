import { createGlobalStyle } from 'styled-components'
import DMSerifDisplay from '../src/assets/fonts/DMSerifDisplay-Regular.ttf'

//글씨체 추가
//Inter과 Monospace 같은 경우에는 추가 안해도 적용돼서 따로 추가 안했습니다
export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "DMSerifDisplay";
        src: url(${DMSerifDisplay}) format("truetype");
    }`
