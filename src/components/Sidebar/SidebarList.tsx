import React, { useState } from "react";
import styled from "styled-components";
import TileButton from './TileButton';

// 호버 감지 영역
const WrapperArea = styled.div`
    position: fixed;
    height: 80vh;
    width: 80px;
    top: 50%;
    transform: translate(0%, -50%);
    left: 0;
    border-radius: 20px;
    z-index: 2;
`;

// 사이드바 스타일
const Wrapper = styled.div<{ isOpenSide: boolean }>`
    position: relative;
    height: 80vh;
    width: 80px;
    top: 50%;
    transform: translate(${({ isOpenSide }) =>
        isOpenSide ? `30%` : `-20%`}, -50%);
    left: -55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    border: 2px solid transparent;
    border-radius: 10px;
    background-image: linear-gradient(#fff, #fff),
    linear-gradient(to bottom, #76CAE8, #AD51DE);
    background-origin: border-box;
    background-clip: content-box, border-box;
    transition: linear .3s;
`;

// list : [icon, onClick]
interface SidebarProps {
    list?: Array<[icon: string, 
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void]>;
    isOpedSidePanel: boolean;
}

// 사이드바
const Sidebar: React.FC<SidebarProps> = ({ list, isOpedSidePanel }) => {
    const [isCursorInArea, setIsCursorInArea] = useState(true);

    const handleMouseEnter = () => {
        setIsCursorInArea(true);
    };
    
    // 2000ms 후에 isCursorInArea 값을 false로 변경
    const handleMouseLeave = () => {
        setTimeout(() => {
        setIsCursorInArea(false);
    }, 1500);
    };

    return (
        <WrapperArea 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <Wrapper isOpenSide={isCursorInArea || isOpedSidePanel}>
                {list && list.map((item) => {
                    const [icon, onClick] = item;
                    return <TileButton icon={icon} onClick={onClick}/>;
                })}
            </Wrapper>
        </WrapperArea>
    );
}

export default Sidebar;