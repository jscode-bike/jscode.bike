import React, { useContext } from "react";
import MonacoEditor from "react-monaco-editor";
import { ArenaContext } from "../ArenaContext";

const Monaco = ({ editorRef }) => {
  const { editorTheme, code, setCode, monacoRef, isSmallScreen } = useContext(
    ArenaContext
  );

  return (
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
        monacoRef.current = m;
        // using above monacoRef for syntax highlighting throughout the app
      }}
      height={
        isSmallScreen
          ? "calc(var(--editor-height) - var(--spacing-small))"
          : "var(--editor-height)"
      }
    />
  );
};

export default Monaco;
