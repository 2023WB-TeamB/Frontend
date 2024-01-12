import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import BubbleMenubar from './BubbleMenubar'

const extensions = [
  StarterKit,
]

const content = '<p>Hello World!</p>'

const EditorWrapper = styled.div`
  position: relative;
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
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>
        <BubbleMenubar>

        </BubbleMenubar>
      </BubbleMenu>
    </EditorWrapper>
  )
}

export default EditorArea