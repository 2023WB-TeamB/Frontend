import styled, { css } from 'styled-components'
import { darken } from 'polished'

type CardProps = {
  rotate: number
  visible: boolean
  backgroundColor: string
}

const Card = styled.div<CardProps>`
  position: absolute;
  width: 20.5vh;
  min-width: 9.7rem;
  height: 27.5vh;
  min-height: 13rem;
  line-height: 3.2vh;
  color: white;
  background: ${({ backgroundColor }) =>
    `linear-gradient(135deg, ${backgroundColor}, ${darken(0.02, backgroundColor)})`};
  border-radius: 1.5rem;
  text-align: left;
  border: 0.08rem solid darkgray;
  padding: 2.95vh 2.53vh;
  top: 120%;
  left: 50%;
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.16),
    0px 3px 6px rgba(0, 0, 0, 0.23);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition:
    transform 0.3s,
    visibility 0.4s,
    opacity 0.4s;

  // RoundCarousel 컴포넌트로부터 CurrentRotate를 props로 넘겨받아서 회전 수행
  ${({ rotate }) =>
    rotate !== undefined &&
    css`
      transform: translate(-50%, 0%) rotate(${rotate}deg) translate(55.5vh) rotate(-${rotate}deg)
        rotate(${rotate + 90}deg);
    `}

  // hover 효과: 크기 조금 커지면서 위로 올라옴
  &:hover {
    ${({ rotate }) =>
      rotate !== undefined &&
      css`
        transform: translate(-50%, 0%) rotate(${rotate}deg) translate(56.5vh) rotate(-${rotate}deg)
          rotate(${rotate + 90}deg) scale(1.02);
      `}
  }
`

export default Card
