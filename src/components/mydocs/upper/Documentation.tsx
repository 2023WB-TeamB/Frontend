import React from 'react'
import styled from 'styled-components'
import githubIcon from '../../../assets/images/mydocs/github.svg'
import documentIcon from '../../../assets/images/mydocs/document.svg'
import arrow from '../../../assets/images/mydocs/arrow.svg'

// Github -> Document 아이콘 도식화

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  margin-top: 3vh;
`
const StyledArrow = styled.img`
  width: 120px;
`

const StyledImg = styled.img`
  width: 40px;
  height: 40px;
`

export const Documentation: React.FC = () => {
  return (
    <Wrapper>
      <StyledImg src={githubIcon} alt="Left Icon" />
      <StyledArrow src={arrow} alt="Arrow Icon" />
      <StyledImg src={documentIcon} alt="Right Icon" />
    </Wrapper>
  )
}
export default Documentation
