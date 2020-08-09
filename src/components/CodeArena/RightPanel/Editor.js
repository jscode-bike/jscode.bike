import React, { useEffect, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import { getCssVariableNumberValue } from "../../../utils/utils.js";

const Editor = ({ editorTheme, code, setCode }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    const resizeFn = function () {
      const headerTabAndSubmitHeight =
        getCssVariableNumberValue("--header-height") +
        getCssVariableNumberValue("--submit-button-height") +
        getCssVariableNumberValue("--tab-height") +
        getCssVariableNumberValue("--spacing-small") +
        getCssVariableNumberValue("--spacing-medium");
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
