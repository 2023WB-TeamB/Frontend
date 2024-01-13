import React from 'react'
import styled from 'styled-components'

interface StyledProps {
  color?: string
  fontSize?: string
  width?: string
}

const Content = styled.div<StyledProps>`
  background: ${({ color }) => color || 'rgba(0, 0, 0, 1)'};
  color: white;
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  width: ${({ width }) => width || '20rem'};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
`

interface ModalContentProps {
  color?: string
  title: string
  updated_at: string
  fontSize?: string
  width?: string
}

const ModalContent: React.FC<ModalContentProps> = ({
  color,
  title,
  updated_at,
  fontSize,
  width,
}) => {
  return (
    <Content color={color} fontSize={fontSize} width={width} onClick={(e) => e.stopPropagation()}>
      {title && <h2>{title}</h2>}
      {updated_at && <p>{updated_at}</p>}
    </Content>
  )
}

export default ModalContent
