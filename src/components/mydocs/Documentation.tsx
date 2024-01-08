import React from 'react'
import styled from 'styled-components'
import githubIcon from '../../assets/images/github.svg'
import documentIcon from '../../assets/images/document.svg'
import arrow from '../../assets/images/arrow.svg'

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  margin-top: 20px;
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
    <BoxWrapper>
      <StyledImg src={githubIcon} alt="Left Icon" />
      <StyledArrow src={arrow} alt="Arrow Icon" />
      <StyledImg src={documentIcon} alt="Right Icon" />
    </BoxWrapper>
  )
}
