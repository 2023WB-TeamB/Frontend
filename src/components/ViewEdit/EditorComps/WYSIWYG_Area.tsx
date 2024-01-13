import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import BubbleMenubar from './BubbleMenubar'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'

const extensions = [
  StarterKit,
  Document, 
  Paragraph, 
  Text,
  Italic,
  Underline,
]

const content = '<p>Hellowfoajwofj fw1123</p>'

const EditorWrapper = styled.div`
  position: relative;
  min-height: 450px;
  height: 100%;

  // * Editor Form
  & .editor-content {
    padding: 1px;
    line-height: 1;
  }
`

const EditorArea = () => {
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

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
      <EditorContent editor={editor} ref={editorRef} />
      <BubbleMenu editor={editor}>
        <BubbleMenubar editor={editor}/>
      </BubbleMenu>
    </EditorWrapper>
  )
}

export default EditorArea