import React from "react";
import styled from "styled-components";

const StyledBackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.15);
    z-index: 9999;
`;

const BackDrop: React.FC = () => {
    return (
        <StyledBackDrop/>
    );
}

export default BackDrop