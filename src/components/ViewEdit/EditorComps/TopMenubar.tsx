import { Editor } from "@tiptap/react";
import styled from "styled-components"

const TopOptionBarWrapper = styled.div`
  position: fixed;
  top: -20px;
  left: 50%;
  width: 80vw;
  height: 40px;
  transform: translateX(-50%);
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

interface TopMenubarProps {
    editor: Editor;
}

const TopMenubar = ({ editor }: TopMenubarProps) => {
    if (!editor) {
        return null
    }
    return (
        <TopOptionBarWrapper>
            <StyledButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}>
                undo
            </StyledButton>
            <StyledButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}>
                redo
            </StyledButton>
            <StyledButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                가로줄
            </StyledButton>
            <StyledButton
                onClick={() => editor.commands.toggleList('bullet_list', 'list_item')}>
                토글
                </StyledButton>
        </TopOptionBarWrapper>
    )
} 

export default TopMenubar