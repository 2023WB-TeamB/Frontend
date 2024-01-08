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
    border: 1px solid transparent;
    border-radius: 50px;
    background-image: linear-gradient(#fff, #fff),
    linear-gradient(#202020, #202020);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.20);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: linear .5s;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    & p {
        margin-right: 5px;
        width: 100%;
        text-align: center;
    }

    &:hover {
        background-image: linear-gradient(#fff, #fff),
        linear-gradient(to bottom right, #76CAE8, #AD51DE);
        transition: linear .5s;
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