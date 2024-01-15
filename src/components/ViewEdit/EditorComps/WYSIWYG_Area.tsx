import "./TiptapStyles.css";

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import TopMenubar from './TopMenubar'
import BubbleMenubar from './BubbleMenubar'
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
import { Color } from '@tiptap/extension-color'
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);

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
    nested: false,
  }),
  Link,
]

// ! 임시 문서 내용
const content = '<p>Hellowfoajwofj fw1123</p>'

const EditorWrapper = styled.div`
  position: relative;
  min-height: 450px;
  height: 100%;

  // * Editor Form
  & .editor-content {
    padding: 1px;
    line-height: 1;
    overflow: hidden;
  }

  & .tableWrapper {
    border: 1px solid black;
  }
`

const EditorArea = () => {
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  // ? 에디터 객체 생성
  const editor:any = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'editor-content',
      },
    }
  })

  return (
    <EditorWrapper>
      <TopMenubar editor={editor}/>
      <EditorContent editor={editor} ref={editorRef} />
      <BubbleMenu editor={editor}>
        <BubbleMenubar editor={editor}/>
      </BubbleMenu>
    </EditorWrapper>
  )
}

export default EditorArea