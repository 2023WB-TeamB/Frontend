// GradientBtn.tsx

import { styled } from 'styled-components'

const GradientBtn = styled.button<{ isDarkMode: boolean }>`
  height: 50px;
  width: 317px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  font-family: 'Inter-Regular', Helvetica;
  color: ${(props) => (props.isDarkMode ? 'black' : 'white')};
  background-image: linear-gradient(to right, #79c5e8, #a26be1, #79c5e8);
  box-shadow: 0 0 20px ${(props) => (props.isDarkMode ? '#202020' : '#eee')};
  border-radius: 25px;

  &:hover {
    background-position: right center;
  }
`

export default GradientBtn
