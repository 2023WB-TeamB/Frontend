import React from "react"
import styled from "styled-components"

const BubbleMenuWrapper = styled.div`
    width: 240px;
    height: 60px;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
`

interface BubbleMenuProps {

}

const BubbleMenubar: React.FC<BubbleMenuProps> = () => {
    return (
        <BubbleMenuWrapper>

        </BubbleMenuWrapper>
    );
}

export default BubbleMenubar;