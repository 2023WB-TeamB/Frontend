import styled, { css } from 'styled-components'
import { darken } from 'polished'

type CardProps = {
  rotate: number
  visible: boolean
  backgroundColor: string
}

const Card = styled.div<CardProps>`
  position: absolute;
  width: 9.2rem;
  height: 13rem;
  line-height: 1.5rem;
  color: white;
  background: ${({ backgroundColor }) =>
    `linear-gradient(135deg, ${backgroundColor}, ${darken(0.02, backgroundColor)})`};
  border-radius: 1.5rem;
  text-align: left;
  padding: 1.2rem 1.5rem;
  top: 120%;
  left: 50%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: transform 0.3s, visibility 0.4s, opacity 0.4s;

  // RoundCarousel 컴포넌트로부터 CurrentRotate를 props로 넘겨받아서 회전 수행
  ${({ rotate }) =>
    rotate !== undefined &&
    css`
      transform: translate(-50%, 0%) rotate(${rotate}deg) translate(26rem) rotate(-${rotate}deg)
        rotate(${rotate + 90}deg);
    `}

  // hover 효과: 크기 조금 커지면서 위로 올라옴
  &:hover {
    ${({ rotate }) =>
      rotate !== undefined &&
      css`
        transform: translate(-50%, 0%) rotate(${rotate}deg) translate(26.5rem) rotate(-${rotate}deg)
          rotate(${rotate + 90}deg) scale(1.02);
      `}
  }
`

export default Card
