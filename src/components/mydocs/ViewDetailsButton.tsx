import React from 'react'
import styled from 'styled-components'
import imageSrc from '../../assets/images/mydocs/viewDetails.svg'

interface ButtonProps {}

const ImageButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border: none;
  border-radius: 1rem;
  background-color: transparent;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:focus {
    outline: none;
  }

  // 클릭 시 색상, 그림자 변화
  &:active {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(1px);
  }
`

const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`

const Text = styled.span`
  margin-right: 0.6rem; // 이미지와 글씨 사이의 거리를 늘립니다.
  color: white; // 글씨 색을 흰색으로 바꿉니다.
  font-size: 1.5rem; // 글씨 크기를 조정합니다.
`

const ViewDetailsButton: React.FC<ButtonProps> = () => {
  return (
    <ImageButton>
      <Text>View Details</Text>
      <Image src={imageSrc} alt="View Details" />
    </ImageButton>
  )
}

export default ViewDetailsButton
