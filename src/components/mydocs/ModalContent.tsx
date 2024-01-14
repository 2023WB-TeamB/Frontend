import React from 'react'
import styled from 'styled-components'
import ViewDetailsButton from './ViewDetailsButton'

interface StyledProps {
  color?: string
}

const Content = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  background: ${({ color }) => color || 'rgba(0, 0, 0, 1)'};
  color: white;
  font-size: 1rem;
  width: 22rem;
  height: 28rem;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
`

// 문서 최근 수정일
const DateLine = styled.p`
  text-align: right;
`

// 문서 제목
const Title = styled.h2`
  font-size: 1.7rem;
  height: 19rem; // 높이를 지정합니다.
  width: 100%; // 너비를 지정합니다.
  margin: 0;
`

interface ModalContentProps {
  color?: string
  title: string
  updated_at: string
}

const ModalContent: React.FC<ModalContentProps> = ({ color, title, updated_at }) => {
  return (
    <Content color={color} onClick={(e) => e.stopPropagation()}>
      <DateLine>{updated_at.slice(0, 10)}</DateLine>
      <br />
      <Title>{title}</Title>
      <ViewDetailsButton />
    </Content>
  )
}

export default ModalContent
