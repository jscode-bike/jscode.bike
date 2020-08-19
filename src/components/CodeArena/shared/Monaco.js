import React from "react";
import MonacoEditor from "react-monaco-editor";

const Monaco = ({ editorTheme, code, setCode, editorRef }) => (
  <MonacoEditor
    language="javascript"
    theme={editorTheme}
    value={code}
    options={{
      wordWrap: "on",
      formatOnType: true,
      tabCompletion: "on",
      mouseWheelZoom: true,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      contextmenu: true,
      multiCursorModifier: "ctrlCmd",
      fontSize: 18,
    }}
    onChange={setCode}
    editorDidMount={(e) => (editorRef.current = e)}
    height="var(--editor-height)"
  />
);

export default Monaco;
