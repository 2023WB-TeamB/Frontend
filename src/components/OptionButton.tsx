import React from "react";
import styled from "styled-components";

const Icon = styled.img`
    width: 40px;
    height: 40px;
    margin: 5px;
`

const StyledButton = styled.button`
    position: relative;
    width: 280px;
    height: 60px;
    min-height: 45px;
    background-color: white;
    border: 1px solid;
    border-radius: 50px;
    transition: background-image 1s;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    & p {
        margin-right: 5px;
        width: 100%;
        text-align: center;
    }

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

interface OptionProps {
    icon?: string;
    context?: string;
    onClick?: (event:React.MouseEvent<HTMLButtonElement>) => void;
}

const OptionButton: React.FC<OptionProps> = ({ icon, context, onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            <Icon src={icon}></Icon>
            <p>{context}</p>
        </StyledButton>
    );
}

export default OptionButton;