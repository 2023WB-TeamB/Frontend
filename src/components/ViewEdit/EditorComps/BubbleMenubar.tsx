import { Editor } from '@tiptap/react'
import { useCallback, useState } from 'react'
import { useDarkModeStore } from '../../../store/store'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import bold from '../../../assets/images/Viewer/bold.svg'
import bold_dark from '../../../assets/images/Viewer/bold_dark.svg'
import italic from '../../../assets/images/Viewer/italic.svg'
import italic_dark from '../../../assets/images/Viewer/italic_dark.svg'
import underline from '../../../assets/images/Viewer/underlined.svg'
import underline_dark from '../../../assets/images/Viewer/underlined_dark.svg'
import strikethrough from '../../../assets/images/Viewer/strikethrough.svg'
import strikethrough_dark from '../../../assets/images/Viewer/strikethrough_dark.svg'
import code from '../../../assets/images/Viewer/code.svg'
import code_dark from '../../../assets/images/Viewer/code_dark.svg'
import link from '../../../assets/images/Viewer/link.svg'
import link_dark from '../../../assets/images/Viewer/link_dark.svg'
import checkbox from '../../../assets/images/Viewer/check_box.svg'
import checkbox_dark from '../../../assets/images/Viewer/check_box_dark.svg'
import color from '../../../assets/images/Viewer/color.svg'
import color_dark from '../../../assets/images/Viewer/color_dark.svg'

const BubbleMenuWrapper = styled.div<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  border-radius: 10px;
  box-shadow: 0 0 2px
    ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)')};
  font-family: 'Inter', sans-serif;
  overflow: hidden;
`

const StyledButton = styled.button<{ isDarkMode: boolean }>`
  height: 100%;
  width: auto;
  border: none;
  border-radius: 0;
  background-color: transparent;
  font-size: 9px;
  transition: all ease 0.2s;
  color: black;

  &:hover {
    background-color: ${(props) => (props.isDarkMode ? '#484848' : 'lightgray')};
  }
`

interface BubbleMenubarProps {
  editor: Editor
}

const BubbleMenubar = ({ editor }: BubbleMenubarProps) => {
  const [currentColor, setCurrentColor] = useState('#000000')

  const handleButtonClick = () => {
    Swal.fire({
      title: 'Select Color',
      html: `
        <input type="color" id="colorPicker" value="${currentColor}" />
      `,
      showCancelButton: true,
      preConfirm: () => {
        const colorPicker = document.getElementById('colorPicker') as HTMLInputElement
        editor.chain().setColor(colorPicker.value).run()
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentColor(result.value)
      }
    })
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  return (
    <BubbleMenuWrapper isDarkMode={isDarkMode}>
      <StyledButton color={currentColor} onClick={handleButtonClick} isDarkMode={isDarkMode}>
        <img src={isDarkMode ? color_dark : color} />
      </StyledButton>
      <StyledButton onClick={() => editor.chain().toggleBold().run()} isDarkMode={isDarkMode}>
        <img src={isDarkMode ? bold_dark : bold} />
      </StyledButton>
      <StyledButton onClick={() => editor.chain().toggleItalic().run()} isDarkMode={isDarkMode}>
        <img src={isDarkMode ? italic_dark : italic} />
      </StyledButton>
      <StyledButton onClick={() => editor.chain().toggleUnderline().run()} isDarkMode={isDarkMode}>
        <img src={isDarkMode ? underline_dark : underline} />
      </StyledButton>
      <StyledButton onClick={() => editor.chain().toggleStrike().run()} isDarkMode={isDarkMode}>
        <img src={isDarkMode ? strikethrough_dark : strikethrough} />
      </StyledButton>
      <StyledButton onClick={() => editor.chain().toggleCodeBlock().run()} isDarkMode={isDarkMode}>
        <img src={isDarkMode ? code_dark : code} />
      </StyledButton>
      <StyledButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isDarkMode={isDarkMode}>
        <img src={isDarkMode ? checkbox_dark : checkbox} />
      </StyledButton>
      <StyledButton onClick={setLink} isDarkMode={isDarkMode}>
        <img src={isDarkMode ? link_dark : link} />
      </StyledButton>
    </BubbleMenuWrapper>
  )
}

export default BubbleMenubar
