import React from "react";
import styled from "styled-components";
import TileButton from "./TileButton";

const StyledSmallTile = styled.div`
  height: 9.2vh;
  width: 100px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface SmallTileProps {
    icon: string;
    onClick?: (event:React.MouseEvent<HTMLButtonElement>) => void;
}

// 사이드바 작은 타일버튼
const SmallTile: React.FC<SmallTileProps> = ({ icon, onClick }) => {
    return (
        <StyledSmallTile>
            <TileButton icon={icon} onClick={onClick}/>
        </StyledSmallTile>
    )
}

export default SmallTile;