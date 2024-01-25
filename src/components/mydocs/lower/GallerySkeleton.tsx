import styled, { keyframes } from 'styled-components'

const pulseAnimation = keyframes`
  0% { background-position: -100%; }
  100% { background-position: 200%; }
`

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 0.05rem solid darkgray;
  border-radius: 1.5rem;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
  background: #dddddd;
  position: relative;
  font-size: 1.1rem;
  word-break: break-all;
  width: 13.5rem;
  height: 17.5rem;
  padding: 2rem 1.5rem;
  margin: 0.5rem 2rem;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  // 스켈레톤 로딩 애니메이션
  background: linear-gradient(90deg, #d1d1d1, #dadada, #d1d1d1);
  background-size: 200%;
  animation: ${pulseAnimation} 1.5s infinite;

  .dummy-created-at {
    background: #c1c1c1;
    border-radius: 0.2rem;
    height: 0.7rem;
    width: 4rem;
    margin: 1rem 0 0 0;
  }

  .dummy-title {
    background: #c1c1c1;
    border-radius: 0.3rem;
    height: 1.5rem;
    width: 8.5rem;
    margin: 0.4rem 2rem 0 0;
  }

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

  .dummy-tag {
    background: #c1c1c1;
    border-radius: 0.3rem;
    height: 1.1rem;
    width: 2.6rem;
    margin: 0.3rem 0.15rem;
  }
`

function GallerySkeleton() {
  return (
    <SkeletonCard>
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

export default GallerySkeleton
