import styled, { css } from 'styled-components'

type CardProps = {
  rotate: number
  visible: boolean
  backgroundColor: string
}

const Card = styled.div<CardProps>`
  position: absolute;
  width: 10em;
  height: 12em;
  line-height: 1em;
  color: white;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 15%;
  text-align: center;
  top: 125%;
  left: 50%;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: transform 0.4s, visibility 0.4s, opacity 0.4s;
  transition: all 0.3s ease; // 크기 변화 효과를 위한 transition 추가

  ${({ rotate }) =>
    rotate !== undefined &&
    css`
      transform: translate(-50%, 0%) rotate(${rotate}deg) translate(22em) rotate(-${rotate}deg)
        rotate(${rotate + 90}deg);
    `}

  &:hover {
    ${({ rotate }) =>
      rotate !== undefined &&
      css`
        transform: translate(-50%, 0%) rotate(${rotate}deg) translate(23em) rotate(-${rotate}deg)
          rotate(${rotate + 90}deg) scale(1.02);
      `}
  }
`

export default Card
