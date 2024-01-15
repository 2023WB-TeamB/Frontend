import { Editor } from "@tiptap/react";
import { useCallback } from "react";
import styled from "styled-components"

const BottomOptionBarWrapper = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 40px;
  border: 1px solid;
  border-radius: 10px;
  background: fixed white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
`

const StyledButton = styled.button`
    height: 40px;
    border: none;
    border-radius: 0;
    background-color: white;
    font-size: 12px;
    transition: all ease .2s;

    &:hover {
        background-color: lightgray;
    }
`

interface BottomMenubarProps {
    editor: Editor;
}

const TopMenubar = ({ editor }: BottomMenubarProps) => {
    const addImage = useCallback(() => {
        const url = window.prompt('URL')
    
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
      }, [editor])
    
    if (!editor) {
        return null
    }
    return (
        <BottomOptionBarWrapper>
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
            <StyledButton onClick={addImage}>
                이미지 삽입
            </StyledButton>
            <StyledButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                표
            </StyledButton>
        </BottomOptionBarWrapper>
    )
} 

export default TopMenubar