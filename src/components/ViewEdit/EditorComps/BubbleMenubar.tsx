import { Editor } from "@tiptap/react"
import styled from "styled-components"

const BubbleMenuWrapper = styled.div`
    height: 30px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    overflow: hidden;
`

const StyledButton = styled.button`
    height: 100%;
    border: none;
    border-radius: 0;
    background-color: transparent;
    font-size: 12px;
    transition: all ease .2s;

    &:hover {
        background-color: lightgray;
    }
`

interface BubbleMenubarProps {
    editor: Editor;
}

const BubbleMenubar = ({ editor }: BubbleMenubarProps) => {
    return (
        <BubbleMenuWrapper>
            <StyledButton onClick={() => editor.chain().focus().toggleBold().run()}>Bold</StyledButton>
            <StyledButton onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</StyledButton>
            <StyledButton onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</StyledButton>
            <StyledButton onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</StyledButton>
            <StyledButton onClick={() => editor.chain().focus().toggleCode().run()}>Code</StyledButton>
        </BubbleMenuWrapper>
    );
}

export default BubbleMenubar;