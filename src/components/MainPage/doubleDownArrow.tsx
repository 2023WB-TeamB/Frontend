import styled, { keyframes } from 'styled-components'
import down_arrow from '../../assets/images/MainPage/down_arrow.svg'

const downAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(1rem);
    opacity: 0;
  }
`

const StyledDoubleDownArrow = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  position: absolute;
  left: 50%;
  bottom: 20px;
  animation: ${downAnimation} 1.2s ease-out infinite;
  background-image: url(${down_arrow});
  background-repeat: no-repeat;
`

const DoubleDownArrow = () => {
  return <StyledDoubleDownArrow />
}

export default DoubleDownArrow
