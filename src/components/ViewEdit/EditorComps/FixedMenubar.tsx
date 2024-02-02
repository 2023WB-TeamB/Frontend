import { Editor } from '@tiptap/react'
import { useCallback } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useDarkModeStore } from '../../../store/store'
import undo_dark from '../../../assets/images/Viewer/undo_dark.svg'
import undo from '../../../assets/images/Viewer/undo.svg'
import redo_dark from '../../../assets/images/Viewer/redo_dark.svg'
import redo from '../../../assets/images/Viewer/redo.svg'
import line_dark from '../../../assets/images/Viewer/horizontal-rule_dark.png'
import line from '../../../assets/images/Viewer/horizontal-rule.png'
import photolibrary_dark from '../../../assets/images/Viewer/photo_library_dark.svg'
import photolibrary from '../../../assets/images/Viewer/photo_library.svg'
import table_dark from '../../../assets/images/Viewer/table_dark.svg'
import table from '../../../assets/images/Viewer/table.svg'
import mergeCells from '../../../assets/images/Viewer/MergeCells.png'
import mergeCells_dark from '../../../assets/images/Viewer/MergeCells_dark.png'
import splitCells from '../../../assets/images/Viewer/SplitCells.png'
import splitCells_dark from '../../../assets/images/Viewer/SplitCells_dark.png'
import insertColum from '../../../assets/images/Viewer/InsertColum.png'
import insertColum_dark from '../../../assets/images/Viewer/InsertColum_dark.png'
import insertRow from '../../../assets/images/Viewer/InsertRow.png'
import insertRow_dark from '../../../assets/images/Viewer/InsertRow_dark.png'
import FixedMenubarButton from './FixedMenubarButton'

const FixedOptionBarWrapper = styled.div<{ $isDarkMode: boolean }>`
  width: max-content;
  height: max-content;
  margin: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  border: 1px solid;
  border-top: none;
  border-color: ${(props) => (props.$isDarkMode ? '#333' : '#c8c8c8')};
  border-radius: 10px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  background-color: transparent;
  transition: linear 0.3s;
`

interface FixedMenubarProps {
  editor: Editor
}

const FixedMenubar = ({ editor }: FixedMenubarProps) => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const addImage = useCallback(() => {
    Swal.fire({
      title: 'Input Image URL',
      input: 'url',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: async (url) => {
        console.log(url)
        editor.chain().focus().setImage({ src: url }).run()
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }, [editor])

  // ? 테이블 추가
  const addTable = () => {
    editor.chain().focus().insertTable().run()
  }

  if (!editor) {
    return null
  }

  return (
    <FixedOptionBarWrapper $isDarkMode={$isDarkMode}>
      <FixedMenubarButton
        icon={$isDarkMode ? undo_dark : undo}
        disable={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <FixedMenubarButton
        icon={$isDarkMode ? redo_dark : redo}
        disable={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      />
      <FixedMenubarButton
        icon={$isDarkMode ? line_dark : line}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />
      <FixedMenubarButton
        icon={$isDarkMode ? photolibrary_dark : photolibrary}
        onClick={addImage}
      />
      <FixedMenubarButton icon={$isDarkMode ? table_dark : table} onClick={addTable} />
      <FixedMenubarButton
        icon={
          editor.can().splitCell()
            ? $isDarkMode
              ? splitCells_dark
              : splitCells
            : $isDarkMode
              ? mergeCells_dark
              : mergeCells
        }
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
      />
      <FixedMenubarButton
        icon={$isDarkMode ? insertColum_dark : insertColum}
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      />
      <FixedMenubarButton
        icon={$isDarkMode ? insertRow_dark : insertRow}
        onClick={() => editor.chain().focus().addRowAfter().run()}
      />
    </FixedOptionBarWrapper>
  )
}

export default FixedMenubar
