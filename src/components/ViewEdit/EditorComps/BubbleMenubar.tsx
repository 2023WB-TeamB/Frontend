import { Editor } from "@tiptap/react";
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
  font-size: 12px;
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
    </BubbleMenuWrapper>
  );
};

export default BubbleMenubar;