import React, { useState, useRef, useEffect, useCallback } from "react";
import { submitCode, codeErrorMessage } from "../../utils/utils.js";
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
  const [loading, setLoading] = useState(false);
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const handleEditorInput = (inputVal) => {
    setCode(inputVal);
  };
  const trySubmission = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const submissionResults = await submitCode(code, tests, variableName);
      setResults(submissionResults);
    } catch (error) {
      alert(codeErrorMessage(variableName, error));
    }
    setLoading(false)
  };

  const submissionCallback = useCallback(trySubmission);

  const handleSubmit = async (e) => {
    await trySubmission();
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
        await submissionCallback();
      }
    };
    window.addEventListener("resize", resizeFn);
    window.addEventListener("keydown", cmdSaveFn);
    return () => {
      window.removeEventListener("resize", resizeFn);
      window.removeEventListener("keydown", cmdSaveFn);
    };
  }, [submissionCallback]);
  const options = {
    wordWrap: "on",
    formatOnType: true,
    tabCompletion: "on",
  };
  return (
    <Container>
      <SidePanel {...{ name, description, handleSubmit, results, loading }} />
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
