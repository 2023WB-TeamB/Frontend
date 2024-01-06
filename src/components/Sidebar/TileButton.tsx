import React from "react";
import styled from "styled-components";

const Icon = styled.img`
    width: 40px;
    height: 40px;
    z-index: 1;
    transition: filter 0.3s;
`;

const StyledTileButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96%;
    height: calc(10vh - 5px);
    min-height: 40px;
    background-color: white;
    transition: background-image 1s;
    overflow: hidden;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to bottom right, #76CAE8, #AD51DE);
        opacity: 0;
        transition: opacity 0.25s;
    }

    &:focus:before {
        opacity: 1;
    }

    &:focus {
        ${Icon} {
            filter: brightness(0) invert(100%) sepia(100%) saturate(0) hue-rotate(0deg);;
        }
    }
`;

interface ButtonProps {
    icon?: string;
    onClick?: (event:React.MouseEvent<HTMLButtonElement>) => void;
}

// 사이드바 타일버튼 기본 양식
const TileButton: React.FC<ButtonProps> = ({icon, onClick}) => {
    const buttonStyle = {
        height: '9vh',
    };

    return (
        <StyledTileButton onClick={onClick} style={buttonStyle}>
            <Icon src={icon}></Icon>
        </StyledTileButton>
    );
}

export default TileButton;