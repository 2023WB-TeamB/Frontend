import { Editor } from "@tiptap/react";
import { useCallback, useState } from "react";
import styled from "styled-components";
import Swal from 'sweetalert2';

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
  const [currentColor, setCurrentColor] = useState('#000000');
  
  const handleButtonClick = () => {
    Swal.fire({
      toast: true,
      title: 'Select Color',
      html: `
        <input type="color" id="colorPicker" value="${currentColor}" />
      `,
      showCancelButton: true,
      preConfirm: () => {
        const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
        editor.chain().setColor(colorPicker.value).run();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentColor(result.value);
      }
    });
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
      <StyledButton color={currentColor} onClick={handleButtonClick}>Color</StyledButton>
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