import React, { useState, useRef } from "react";
import { submitCode, codeErrorMessage } from "../../utils/utils";
import MonacoEditor from "react-monaco-editor";
import { SidePanel } from "./SidePanel.js";
import styled from "styled-components";

export const CodeArena = ({
  name,
  variableName,
  description,
  startingCode,
  tests,
  solutions,
}) => {
  const [code, setCode] = useState(startingCode || "");
  const [results, setResults] = useState(null);
  const editorContainer = useRef(null);
  const handleEditorInput = (inputVal) => {
    setCode(inputVal);
  };
  const handleSubmit = (e) => {
    try {
      const submissionResults = submitCode(code, tests, variableName);
      setResults(submissionResults);
    } catch (error) {
      alert(codeErrorMessage(variableName));
    }
  };
  const editorDidMount = (e) => {
    const resizeFn = function () {
      e.layout({
        height: window.innerHeight - 30,
        width: ((window.innerWidth / 3) * 2) | 0,
      });
    };
    window.addEventListener("resize", resizeFn);
  };
  const options = {
    wordWrap: "on",
    formatOnType: true,
    tabCompletion: "on",
  };
  return (
    <Container>
      <SidePanel {...{ name, description, handleSubmit, results }} />
      <div ref={editorContainer}>
        <MonacoEditor
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={handleEditorInput}
          editorDidMount={editorDidMount}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 2rem);
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
