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
      minimap: {
        enabled: false,
      },
    }}
    onChange={setCode}
    editorDidMount={(e, m) => {
      editorRef.current = e;
      // this is how you define theme!
      // m.editor.defineTheme()
    }}
    height="var(--editor-height)"
  />
);

export default Monaco;
