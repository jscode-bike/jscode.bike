import React, { useEffect, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import { getCssVariableNumberValue } from "../../../utils/utils.js";

const Editor = ({ editorTheme, code, setCode }) => {
  const editorRef = useRef(null);
  
  useEffect(() => {
    const resizeFn = function () {
      const headerTabAndSubmitHeight = [
        "--header-height",
        "--tab-height",
        "--spacing-small",
        "--button-panel-height",
        "--spacing-medium",
      ].reduce((a, b) => a + getCssVariableNumberValue(b), 0);
      const height = window.innerHeight - headerTabAndSubmitHeight;
      editorRef.current.layout({
        height,
        width:
          ((window.innerWidth / 9) * 5 -
            getCssVariableNumberValue("--spacing-medium")) |
          0,
      });
    };
    window.addEventListener("resize", resizeFn);
    return () => window.removeEventListener("resize", resizeFn);
  }, [editorRef]);

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
      }}
      onChange={setCode}
      editorDidMount={(e) => (editorRef.current = e)}
      height="var(--editor-height)"
    />
  );
};

export default Editor;
