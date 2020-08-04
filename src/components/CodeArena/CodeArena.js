import React, { useState } from "react";
import { submitCode } from "../../utils/utils";
import MonacoEditor from "react-monaco-editor";

export const CodeArena = ({
  name,
  variableName,
  description,
  startingCode,
  tests,
  solutions,
}) => {
  const [code, setCode] = useState(startingCode || '');
  const handleEditorInput = (inputVal) => {
    setCode(inputVal);
  };
  const handleSubmit = (e) => {
    const results = submitCode(code, tests, variableName);
    console.log(code, results);
  };
  const editorDidMount = (e) => {
    console.log("editor did mount e:", e);
  };
  const options = {
    wordWrap: "on",
    formatOnType: true,
    tabCompletion: "on",
  };
  return (
    <div style={{ height: "calc(100vh - 2rem)", display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <h3>{name}</h3>
        <p>{description}</p>
        <button onClick={handleSubmit}>submit</button>
      </div>
      <MonacoEditor
        width="70%"
        // height="800"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={handleEditorInput}
        editorDidMount={editorDidMount}
      />
    </div>
  );
};
