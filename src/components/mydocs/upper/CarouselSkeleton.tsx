import styled, { css, keyframes } from 'styled-components'

type SkeletonCardProps = {
  rotate: number
  visible: boolean
}

const pulseAnimation = keyframes`
  0% { background-position: -100%; }
  100% { background-position: 200%; }
`

const SkeletonCard = styled.div<SkeletonCardProps>`
  position: absolute;
  width: 9.7rem;
  height: 13rem;
  line-height: 1.5rem;
  color: white;
  background: #dddddd;
  border-radius: 1.5rem;
  text-align: left;
  border: 0.08rem solid darkgray;
  padding: 1.4rem 1.2rem;
  top: 120%;
  left: 50%;
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.16),
    0px 3px 6px rgba(0, 0, 0, 0.23);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: transform 0.3s;

  // RoundCarousel 컴포넌트로부터 CurrentRotate를 props로 넘겨받아서 회전 수행
  ${({ rotate }) =>
    rotate !== undefined &&
    css`
      transform: translate(-50%, 0%) rotate(${rotate}deg) translate(26rem) rotate(-${rotate}deg)
        rotate(${rotate + 90}deg);
    `}

  // 스켈레톤 로딩 애니메이션
  background: linear-gradient(
    90deg,
    #d1d1d1, 
    #dadada,
    #d1d1d1
  );
  background-size: 200%;
  animation: ${pulseAnimation} 1.5s infinite;

  // 더미 생성일
  .dummy-created-at {
    background: #c1c1c1;
    border-radius: 0.2rem;
    height: 0.7rem;
    width: 4rem;
    margin: 1rem 0 0 0;
  }

  // 더미 타이틀
  .dummy-title {
    background: #c1c1c1;
    border-radius: 0.3rem;
    height: 1.5rem;
    margin: 0.4rem 2rem 0 0;
  }

  // 더미 태그 래퍼
  .dummy-tag-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100%;
    height: 5.7rem;
    line-height: 1.2rem;
    margin-top: 0.3rem;
    overflow: hidden;
  }

  // 더미 태그
  .dummy-tag {
    background: #c1c1c1;
    border-radius: 0.4rem;
    height: 1rem;
    width: 2.4rem;
    margin: 0.3rem 0.1rem;
  }
`

const CarouselSkeleton = ({ rotate, visible }: SkeletonCardProps) => {
  return (
    <SkeletonCard rotate={rotate} visible={visible}>
      <div className="dummy-created-at" />
      <div className="dummy-title" />
      <div className="dummy-tag-wrapper">
        <div className="dummy-tag" />
        <div className="dummy-tag" />
        <div className="dummy-tag" />
        <div className="dummy-tag" />
        <div className="dummy-tag" />
        <div className="dummy-tag" />
      </div>
    </SkeletonCard>
  )
}

export default CarouselSkeleton
