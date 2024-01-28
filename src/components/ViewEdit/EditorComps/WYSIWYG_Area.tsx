import './TiptapStyles.css'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextStyle from '@tiptap/extension-text-style'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Typography from '@tiptap/extension-typography'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Color } from '@tiptap/extension-color'
import { common, createLowlight } from 'lowlight'
import { marked } from 'marked'
import BubbleMenubar from './BubbleMenubar'
import BottomMenubar from './BottomMenubar'
import { useDocContentStore, useEditorModeStore } from '../../../store/store'

const lowlight = createLowlight(common)

// ? TipTap 확장 모듈
const extensions = [
  StarterKit,
  Document,
  Paragraph,
  Text,
  Bold,
  Italic,
  Underline,
  Strike,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  TextStyle,
  Color,
  HorizontalRule,
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
  Dropcursor,
  Gapcursor,
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
  align-items: center;

  //* Editor Form
  & .editor-content {
    line-height: 1.5rem;
    padding: 10px;
    outline: 0;
    overflow: hidden;
  }
`

const EditorArea: React.FC = () => {
  const editorRef = useRef<any>(null)
  const { isEditor } = useEditorModeStore()
  const { content, setContent } = useDocContentStore()

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  // ? 에디터 객체 생성
  const editor: any = useEditor({
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

  if (!editor) {
    return null
  }

  const uploadImageToS3 = async (file: any) => {
    const s3Endpoint = 'https://your-s3-bucket.s3.amazonaws.com'
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${s3Endpoint}/your-upload-path`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        return data.imageUrl // S3에 업로드된 이미지 URL
      } else {
        throw new Error('Image upload failed')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  // 이미지 드롭 기능
  const handleDrop = async (event: any) => {
    const cloudFrontEndpoint = 'https://your-cloudfront-domain'
    event.preventDefault()
    const file = event.dataTransfer.files[0]

    if (file && file.type.includes('image/')) {
      const imageUrl = await uploadImageToS3(file)
      const cdnImageUrl = `${cloudFrontEndpoint}/${imageUrl}`
      // 클라이언트에서 CDN 이미지 URL 활용
      console.log('CDN 이미지 URL:', cdnImageUrl)
    }
  }

  return (
    <EditorWrapper>
      <EditorContent
        editor={editor}
        ref={editorRef}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      />
      <BubbleMenu editor={editor}>
        <BubbleMenubar editor={editor} />
      </BubbleMenu>
      {isEditor && <BottomMenubar editor={editor} />}
    </EditorWrapper>
  )
}

export default EditorArea
