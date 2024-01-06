import React from "react";
import styled from "styled-components";
import SmallTile from "./SmallTile";
import BigTile from "./BigTile";

// 사이드바 스타일
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    border: 1px solid;
    border-image: linear-gradient(to bottom right, #76CAE8, #AD51DE);
    border-image-slice: 1;
`;

// list : [icon, onClick]
interface SidebarProps {
    list?: Array<[icon: string, 
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void]>;
}

// 사이드바
const Sidebar: React.FC<SidebarProps> = ({ list }) => {
    return (
        <Wrapper>
            {list && list.map((item, index) => {
                const [icon, onClick] = item;
                if (index === 0 || index === list.length - 1) {
                    return <SmallTile icon={icon} onClick={onClick}/>;
                } else {
                    return <BigTile icon={icon} onClick={onClick}/>;
                }
            })}
        </Wrapper>
    );
}

export default Sidebar;