import styled, { keyframes, css } from 'styled-components'

interface stepPateTitleProps {
  fontSize?: string
  top?: string
  fontfamily?: string
  left?: string
  $littleFontSize?: string
  visible?: boolean
  $isDarkMode: boolean
}
const slideUpFade = keyframes`
  0%{
    opacity: 0;
    transform: translateY(100%);
  }
  50%{
    opacity: 0.5;
    transform: tralateY(50%);
  }
  100%{
    opacity: 1;
    transform: tralateY(0);
  }
`
const StyledStep = styled.h1<stepPateTitleProps>`
  font-size: ${(props) => props.fontSize || '3rem'};
  font-weight: 400;
  /* font-family: ${(props) => props.fontfamily || 'DMSerifDisplay'}; */
  font-family: 'DMSerifDisplay', serif;
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  letter-spacing: 0;
  margin: 0.5rem 0;
  z-index: 2;
  white-space: nowrap;
  animation: ${(props) =>
    props.visible
      ? css`
          ${slideUpFade} 1s  ease-out;
        `
      : 'none'};
  @media (max-width: 720px) {
    font-size: ${(props) => props.$littleFontSize || props.fontSize || '2.5rem'};
  }
`

export default StyledStep
