import './EditorStyles.css'
import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef } from 'react'
import Underline from '@tiptap/extension-underline'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Color } from '@tiptap/extension-color'
import { common, createLowlight } from 'lowlight'
import { marked } from 'marked'
import styled from 'styled-components'
import axios from 'axios'
import { useDocContentStore, useEditorModeStore, useEditorObjectStore } from '../../../store/store'
import BubbleMenubar from './BubbleMenubar'

const lowlight = createLowlight(common)

// ? TipTap 확장 모듈
const extensions = [
  StarterKit,
  Underline,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  TextStyle,
  Color,
  Typography,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Link,
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
]

const EditorWrapper = styled.div`
  position: relative;
  min-height: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  //* Editor Form
  & .editor-content {
    line-height: 1.5rem;
    padding: 0.1rem 0.1rem 0px;
    outline: 0;
    overflow: hidden;
  }
`

const EditorArea: React.FC = () => {
  const editorRef = useRef<any>(null)
  const { editor, setEditor } = useEditorObjectStore()
  const { isEditor } = useEditorModeStore()
  const { content, setContent } = useDocContentStore()

  useEffect(() => {
    if (editorRef.current) editorRef.current.focus()
  }, [])

  const tempEditorObj: Editor | null = useEditor({
    editable: isEditor,
    extensions,
    content: marked(content),
    editorProps: {
      attributes: {
        class: 'editor-content',
      },
    },
    onUpdate: ({ editor }) => {
      if (content !== '') setContent(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor) editor.setEditable(isEditor)
  }, [editor, isEditor])

  if (tempEditorObj && !editor) {
    setEditor(tempEditorObj)
  }

  // 이미지 업로드 함수
  const uploadImageToServer = async (file: any) => {
    const formData = new FormData()
    formData.append('file', file)

    // Set config for axios
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    try {
      const response = await axios.post('https://gitodoc.kro.kr/api/v1/docs/img', formData, config)
      return `${response.data.imageUrl}?w=400&f=webp` // 쿼리 파라미터 추가
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  if (!editor) return null

  // 이미지 드롭 기능
  const handleDrop = async (event: any) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]

    if (file && file.type.includes('image/')) {
      const imageUrl = await uploadImageToServer(file)
      // 클라이언트에서 서버에서 받은 CDN 이미지 URL 활용
      console.log('CDN 이미지 URL:', imageUrl)

      // 이미지 삽입
      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run()
      }
    }
  }

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      if (!editor.can().liftListItem('listItem'))
        editor.chain().focus().toggleBulletList().run()
      else
        editor.chain().focus().sinkListItem('listItem').run()
      event.preventDefault()
    }
  }

  return (
    <EditorWrapper>
      <EditorContent
        editor={editor}
        ref={editorRef}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        onKeyDown={handleKeyEvent}
      />
      <BubbleMenu editor={editor}>
        <BubbleMenubar editor={editor} />
      </BubbleMenu>
    </EditorWrapper>
  )
}

export default EditorArea
