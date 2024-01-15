import { Editor } from "@tiptap/react";
import { useCallback } from "react";
import styled from "styled-components";

const BubbleMenuWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
  overflow: hidden;
`;

const StyledButton = styled.button`
  height: 100%;
  border: none;
  border-radius: 0;
  background-color: transparent;
  font-size: 11px;
  transition: all ease .2s;

  &:hover {
    background-color: lightgray;
  }
`;

interface BubbleMenubarProps {
    editor: Editor;
}

const BubbleMenubar = ({ editor }: BubbleMenubarProps) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().setColor(event.target.value).run();
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])


  return (
    <BubbleMenuWrapper>
      {/* <ColorInput
        type="color"
        onInput={handleColorChange}
        value={editor.getAttributes("textStyle").color}
        data-testid="setColor"
      /> */}
      <StyledButton>Color</StyledButton>
      <StyledButton onClick={() => editor.chain().toggleBold().run()}>
        B
      </StyledButton>
      <StyledButton onClick={() => editor.chain().toggleItalic().run()}>
        I
      </StyledButton>
      <StyledButton onClick={() => editor.chain().toggleUnderline().run()}>
        U
      </StyledButton>
      <StyledButton onClick={() => editor.chain().toggleStrike().run()}>
        S
      </StyledButton>
      <StyledButton onClick={() => editor.chain().toggleCodeBlock().run()}>
        CB
      </StyledButton>
      <StyledButton onClick={() => editor.chain().focus().toggleTaskList().run()}>
        Task
      </StyledButton>
      <StyledButton onClick={setLink}>
        Link
      </StyledButton>
    </BubbleMenuWrapper>
  );
};

export default BubbleMenubar;