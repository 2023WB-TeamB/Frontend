// GradientBtn.js
import { styled } from 'styled-components'

const GradientBtn = styled.button`
  height: 50px;
  width: 150px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  font-family: 'Inter-Regular', Helvetica;
  color: white;
  background-image: linear-gradient(to right, #79c5e8, #a26be1, #79c5e8);
  box-shadow: 0 0 20px #eee;
  border-radius: 25px;

  &:hover {
    background-position: right center;
  }
`

export default GradientBtn
