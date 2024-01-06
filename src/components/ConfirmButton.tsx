import React from "react";
import styled from "styled-components";

const StyledConfirmButton = styled.button`
    width: 130px;
    height: 50px;
    border: 1px solid;
    border-radius: 30px;
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