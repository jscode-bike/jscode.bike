import React, { useState, useRef, useEffect } from "react";
import { submitCode, codeErrorMessage } from "../../utils/utils2";
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
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const handleEditorInput = (inputVal) => {
    setCode(inputVal);
  };
  const handleSubmit = async (e) => {
    try {
      const submissionResults = await submitCode(code, tests, variableName);
      setResults(submissionResults);
    } catch (error) {
      alert(codeErrorMessage(variableName));
    }
  };

  const editorDidMount = (e) => {
    editorRef.current = e;
  };

  useEffect(() => {
    const resizeFn = function () {
      editorRef.current.layout({
        height: window.innerHeight - 30,
        width: ((window.innerWidth / 3) * 2) | 0,
      });
    };
    const cmdSaveFn = async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.which === 83) {
        e.preventDefault();
        try {
          const submissionResults = await submitCode(code, tests, variableName);
          setResults(submissionResults);
        } catch (error) {
          alert(codeErrorMessage(variableName));
        }
      }
    };
    window.addEventListener("resize", resizeFn);
    window.addEventListener("keydown", cmdSaveFn);
    return () => {
      window.removeEventListener("resize", resizeFn);
      window.removeEventListener("keydown", cmdSaveFn);
    };
  }, [code, tests, variableName]);
  const options = {
    wordWrap: "on",
    formatOnType: true,
    tabCompletion: "on",
  };
  return (
    <Container>
      <SidePanel {...{ name, description, handleSubmit, results }} />
      <div ref={editorContainerRef}>
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
