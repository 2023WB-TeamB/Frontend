import React from "react";
import styled from "styled-components";
import TileButton from "./TileButton";

// 아이콘 있는 타일
const RealArea = styled.div`
    min-height: 40px;
    height: 10.15vh;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// 아이콘 없는 타일
const DumpArea = styled.div`
    height: 10.15vh;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

interface BigTileProps {
    icon: string;
    onClick?: (event:React.MouseEvent<HTMLButtonElement>) => void;
}

// 사이드바 큰 타일버튼
const BigTile: React.FC<BigTileProps> = ({ icon, onClick }) => {
    return (
        icon !== "" ? (
            <RealArea>
              <TileButton icon={icon} onClick={onClick} />
            </RealArea>
          ) : (
            <DumpArea></DumpArea>
          )
    )
}

export default BigTile;