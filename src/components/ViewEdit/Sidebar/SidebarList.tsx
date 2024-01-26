import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TileButton from './TileButton'
import { useDarkModeStore, useSidePeekStore, useViewerPageOpenStore } from '../../../store/store'

// 호버 감지 영역
const WrapperArea = styled.div<{ isOpenSideAlways: boolean }>`
  position: ${(props) => (props.isOpenSideAlways ? 'relative' : 'fixed')};
  height: 80vh;
  width: 85px;
  z-index: 1;
`

// 사이드바 스타일
const Wrapper = styled.div<{ isOpenSide: boolean; isDarkMode: boolean; isOpenSideAlways: boolean }>`
  position: relative;
  height: ${(props) => (props.isOpenSideAlways ? '100vh' : '80vh')};
  width: ${(props) => (props.isOpenSideAlways ? '10rem' : '5rem')};
  top: 50%;
  transform: translate(${({ isOpenSide }) => (isOpenSide ? `30%` : `-20%`)}, -50%);
  display: flex;
  left: -50px;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${(props) => (props.isOpenSideAlways ? 'flex-start' : 'flex-end')};
  border-right: 0.8px solid transparent;
  ${(props) =>
    props.isOpenSideAlways
      ? ``
      : `border-top: 0.8px solid transparent;
      border-bottom: 0.8px solid transparent;`};
  border-radius: ${(props) => (props.isOpenSideAlways ? '0' : '10px')};
  background-image: ${(props) =>
    props.isDarkMode
      ? 'linear-gradient(#202020, #202020), linear-gradient(to bottom, #7CC0E8, #A565E0)'
      : 'linear-gradient(#fff, #fff), linear-gradient(to bottom, #7CC0E8, #A565E0)'};
  background-origin: border-box;
  background-clip: content-box, border-box;
  transition: ease-in-out 0.3s;
  overflow: hidden;
`

// list : [icon, name, onClick]
interface SidebarProps {
  list: Array<
    [icon: string, name?: string, onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void]
  >
}

// 사이드바
const Sidebar: React.FC<SidebarProps> = ({ list }) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const isOpenSideAlways = useSidePeekStore((state) => state.isOpenSideAlways)
  const openerStore = useViewerPageOpenStore()
  const isOpenSidePanel = openerStore.isOpenGalleryPanel || openerStore.isOpenVersionPanel
  const [isCursorInArea, setIsCursorInArea] = useState(true)
  let timeoutId: ReturnType<typeof setTimeout>

  const handleMouseEnter = () => {
    setIsCursorInArea(true)
    clearTimeout(timeoutId) // 이전 타이머를 취소합니다.
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsCursorInArea(false)
    }, 2000)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId) // 컴포넌트가 언마운트될 때 타이머를 취소합니다.
    }
  }, [])

  return (
    <WrapperArea
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isOpenSideAlways={isOpenSideAlways}>
      <Wrapper
        isOpenSide={isCursorInArea || isOpenSideAlways || isOpenSidePanel}
        isDarkMode={isDarkMode}
        isOpenSideAlways={isOpenSideAlways}>
        {list &&
          list.map((item) => {
            const [icon, name, onClick] = item
            return <TileButton icon={icon} name={name} onClick={onClick} />
          })}
      </Wrapper>
    </WrapperArea>
  )
}

export default Sidebar
