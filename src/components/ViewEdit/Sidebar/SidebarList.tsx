import React, { useState } from 'react'
import styled from 'styled-components'
import TileButton from './TileButton'
import { useDarkModeStore } from '../../../store/store'

// 호버 감지 영역
const WrapperArea = styled.div`
    position: fixed;
    height: 80vh;
    width: 70px;
    top: 50%;
    transform: translate(0%, -50%);
    left: 0;
    border-radius: 20px;
    z-index: 2;
`;

// 사이드바 스타일
const Wrapper = styled.div<{ isOpenSide: boolean; isDarkMode: boolean }>`
  position: relative;
  height: 80vh;
  width: 80px;
  top: 50%;
  transform: translate(${({ isOpenSide }) => (isOpenSide ? `30%` : `-20%`)}, -50%);
  left: -55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  border: 2px solid transparent;
  border-radius: 10px;
  background-image: ${(props) =>
    props.isDarkMode
      ? 'linear-gradient(#202020, #202020), linear-gradient(to bottom, #76cae8, #ad51de)'
      : 'linear-gradient(#fff, #fff), linear-gradient(to bottom, #76cae8, #ad51de)'};
  background-origin: border-box;
  background-clip: content-box, border-box;
  transition: linear 0.3s;
`

// list : [icon, onClick]
interface SidebarProps {
  list?: Array<[icon: string, onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void]>
  isOpedSidePanel: boolean
}

// 사이드바
const Sidebar: React.FC<SidebarProps> = ({ list, isOpedSidePanel }) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const [isCursorInArea, setIsCursorInArea] = useState(true)

  const handleMouseEnter = () => {
    setIsCursorInArea(true)
  }

  // 2000ms 후에 isCursorInArea 값을 false로 변경
  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsCursorInArea(false)
    }, 2000)
  }

  return (
    <WrapperArea onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Wrapper isOpenSide={isCursorInArea || isOpedSidePanel} isDarkMode={isDarkMode}>
        {list &&
          list.map((item) => {
            const [icon, onClick] = item
            return <TileButton icon={icon} onClick={onClick} />
          })}
      </Wrapper>
    </WrapperArea>
  )
}

export default Sidebar
