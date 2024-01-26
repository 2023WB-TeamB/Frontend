import React from 'react'
import styled from 'styled-components'
import { useDarkModeStore, useSidePeekStore } from '../../../store/store'

const Icon = styled.img`
  width: 28px;
  height: 28px;
  z-index: 1;
  transition: filter 0.3s;
  background: transparent;
`

const StyledTileButton = styled.button<{ isOpenSideAlways: boolean; isDarkMode: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: ${(props) => (props.isOpenSideAlways ? '120%' : '80%')};
  height: 8vh;
  min-height: 45px;
  background-color: transparent;
  transition: background-image 1s;
  overflow: hidden;
  transition: ease 0.3s;
  border: none;
  ${Icon} {
    filter: ${(props) => props.isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)'};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom right, #76cae8, #ad51de);
    opacity: 0;
    transition: opacity 0.25s;
  }

  &:hover {
    filter: none;
    margin-left: 5px;
    transition: ease 0.3s;
    border-inline-start: 3px solid ${(props) => props.isDarkMode ? '#ddd' : '#222'};
    background-color: ${(props) => props.isDarkMode ? '#2d2d2d' : '#f2f2f2'};
  }

  &:active:before {
    opacity: 1;
  }

  &:active {
    ${Icon}, label {
      filter: brightness(0) invert(100%) sepia(100%) saturate(0) hue-rotate(0deg);
    }
  }

  & label {
    margin-left: 15px;
    font-size: 16px;
    color: ${(props) => (props.isDarkMode ? 'white' : '#202020')};
    font-family: 'Inter';
    font-weight: 400;
  }
`

// 아이콘 없는 타일
const DumpArea = styled.div`
  height: 8vh;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

interface ButtonProps {
  icon?: string
  name?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// 사이드바 타일버튼 기본 양식
const TileButton: React.FC<ButtonProps> = ({ icon, name, onClick }) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { isOpenSideAlways } = useSidePeekStore()

  return icon !== '' ? (
    <StyledTileButton onClick={onClick} isOpenSideAlways={isOpenSideAlways} isDarkMode={isDarkMode}>
      <Icon src={icon}></Icon>
      {isOpenSideAlways && <label>{name}</label>}
    </StyledTileButton>
  ) : (
    <DumpArea />
  )
}

export default TileButton
