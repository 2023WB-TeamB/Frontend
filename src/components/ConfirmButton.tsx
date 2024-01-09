import React from "react";
import styled from "styled-components";

const StyledConfirmButton = styled.button`
    width: 130px;
    height: 50px;
    border: 1px solid transparent;
    border-radius: 30px;
    background-image: linear-gradient(#fff, #fff),
    linear-gradient(#202020, #202020);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.20);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: linear .5s;

    &:hover {
        background-image: linear-gradient(#fff, #fff),
        linear-gradient(to bottom right, #76CAE8, #AD51DE);
        transition: linear .5s;
    }
`;

interface ConfirmButtonProps {
    context: string;
    onClick?: (event:React.MouseEvent<HTMLButtonElement>) => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ context, onClick }) => {
    return (
        <StyledConfirmButton onClick={onClick}>
            {context}
        </StyledConfirmButton>
    );
}

export default ConfirmButton;