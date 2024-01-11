import React from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

interface TuiEditorProps {
  content?: string;
  editorRef: React.RefObject<Editor>;
}

const TuiEditor: React.FC<TuiEditorProps> = ({ content, editorRef }) => {
  const handleButtonClick = (command:string, payload:any) => {
    if (editorRef.current) {
      if (payload)
        editorRef.current.getInstance().exec(command, payload);
      else
        editorRef.current.getInstance().exec(command);
    }
  };

  return (
    <div>
      {/*<div>
        <button onClick={() => handleButtonClick("heading", 2)}>제목</button>
        <button onClick={() => handleButtonClick("bold", undefined)}>굵게</button>
        <button onClick={() => handleButtonClick("italic", undefined)}>이탤릭</button>
        <button onClick={() => handleButtonClick("strike", undefined)}>취소선</button>
        <button onClick={() => handleButtonClick("hr", undefined)}>가로선</button>
        <button onClick={() => handleButtonClick("quote")}>인용구</button>
        <button onClick={() => handleButtonClick("ul")}>글머리 기호 목록</button>
        <button onClick={() => handleButtonClick("ol")}>숫자 기호 목록</button>
        <button onClick={() => handleButtonClick("table")}>표</button>
        <button onClick={() => handleButtonClick("link")}>링크</button>
        <button onClick={() => handleButtonClick("code", undefined)}>코드</button>
        <button onClick={() => handleButtonClick("codeblock", 1)}>코드블록</button>
        <button onClick={() => handleButtonClick("image")}>이미지</button>
        <button onClick={() => handleButtonClick("scrollSync")}>스크롤 동기화</button>
  </div>*/}
      <Editor
        initialValue={content ?? ""}
        initialEditType="wysiwyg"
        autofocus={true}
        ref={editorRef}
        height="500px"
      />
    </div>
  );
};

export default TuiEditor;