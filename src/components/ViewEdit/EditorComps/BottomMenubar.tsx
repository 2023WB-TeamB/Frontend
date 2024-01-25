import { Editor } from '@tiptap/react'
import { useCallback } from 'react'
import { useDarkModeStore } from '../../../store/store'
import styled from 'styled-components'
import undo_dark from '../../../assets/images/Viewer/undo_dark.svg'
import undo from '../../../assets/images/Viewer/undo.svg'
import redo_dark from '../../../assets/images/Viewer/redo_dark.svg'
import redo from '../../../assets/images/Viewer/redo.svg'
import line_dark from '../../../assets/images/Viewer/line_dark.svg'
import line from '../../../assets/images/Viewer/line.svg'
import photolibrary_dark from '../../../assets/images/Viewer/photo_library_dark.svg'
import photolibrary from '../../../assets/images/Viewer/photo_library.svg'
import table_dark from '../../../assets/images/Viewer/table_dark.svg'
import table from '../../../assets/images/Viewer/table.svg'

const BottomOptionBarWrapper = styled.div<{ isDarkMode: boolean }>`
  position: fixed;
  bottom: 10px;
  width: 65%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: ${(props) => (props.isDarkMode ? '#303030' : '#f3f3f3')};
  /* background-image: linear-gradient(#fff, #fff), linear-gradient(to bottom right, #76cae8, #ad51de);
  background-origin: border-box;
  background-clip: content-box, border-box; */
  transition: linear 0.3s;
`

const StyledButton = styled.button<{ isDarkMode: boolean }>`
  height: 45px;
  border: none;
  border-radius: 0px;
  background-color: ${(props) => (props.isDarkMode ? '#303030' : '#f3f3f3')};
  font-size: 12px;
  transition: all ease 0.2s;
  color: black;

  &:hover {
    background-color: ${(props) => (props.isDarkMode ? '#484848' : 'lightgray')};
  }
`

interface BottomMenubarProps {
  editor: Editor
}

const TopMenubar = ({ editor }: BottomMenubarProps) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  //? 테이블 추가
  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
  }

  if (!editor) {
    return null
  }
  return (
    <BottomOptionBarWrapper isDarkMode={isDarkMode}>
      <StyledButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        isDarkMode={isDarkMode}>
        <img src={isDarkMode ? undo_dark : undo} />
      </StyledButton>
      <StyledButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        isDarkMode={isDarkMode}>
        <img src={isDarkMode ? redo_dark : redo} />
      </StyledButton>
      <StyledButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        isDarkMode={isDarkMode}>
        <img src={isDarkMode ? line_dark : line} />
      </StyledButton>
      <StyledButton onClick={addImage} isDarkMode={isDarkMode}>
        <img src={isDarkMode ? photolibrary_dark : photolibrary} />
      </StyledButton>
      <StyledButton onClick={addTable} isDarkMode={isDarkMode}>
        <img src={isDarkMode ? table_dark : table} />
      </StyledButton>
    </BottomOptionBarWrapper>
  )
}

export default TopMenubar
