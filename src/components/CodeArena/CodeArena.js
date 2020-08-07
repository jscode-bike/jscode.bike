import React, { useState, useRef, useEffect, useCallback } from "react";
import { submitCode, codeErrorMessage } from "../../utils/utils.js";
import MonacoEditor from "react-monaco-editor";
import { SidePanel } from "./SidePanel/SidePanel.js";
import styled from "styled-components";

export const CodeArena = ({
  name,
  variableName,
  description,
  startingCode,
  tests,
  solutions,
  instructionComponent,
}) => {
  const [code, setCode] = useState(startingCode || "");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidePanelTabIdx, setSidePanelTabIdx] = useState(0);
  const editorRef = useRef(null);
  const handleEditorInput = (inputVal) => {
    setCode(inputVal);
  };
  const trySubmission = async () => {
    if (loading) return;
    setSidePanelTabIdx(1);
    setResults(null);
    setLoading(true);
    try {
      const submissionResults = await submitCode(code, tests, variableName);
      setResults(submissionResults);
    } catch (error) {
      alert(codeErrorMessage(variableName, error));
    }
    setLoading(false);
  };

  const submissionCallback = useCallback(trySubmission);

  const handleSubmit = async (e) => {
    await trySubmission();
  };
  const editorDidMount = (e) => {
    editorRef.current = e;
  };

  useEffect(() => {
    const cmdSaveFn = async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.which === 83) {
        e.preventDefault();
        await submissionCallback();
      }
    };
    window.addEventListener("keydown", cmdSaveFn);
    return () => {
      window.removeEventListener("keydown", cmdSaveFn);
    };
  }, [submissionCallback]);
  useEffect(() => {
    const resizeFn = function () {
      editorRef.current.layout({
        height: window.innerHeight - 75,
        width: ((window.innerWidth / 3) * 2) | 0,
      });
    };
    window.addEventListener("resize", resizeFn);
    return () => {
      window.removeEventListener("resize", resizeFn);
    };
  }, []);
  const options = {
    wordWrap: "on",
    formatOnType: true,
    tabCompletion: "on",
  };
  return (
    <Container>
      <SidePanel
        {...{
          name,
          description,
          handleSubmit,
          results,
          loading,
          instructionComponent,
          tabIdx: sidePanelTabIdx,
          setTabIdx: setSidePanelTabIdx,
        }}
      />
      <div>
        <MonacoEditor
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={handleEditorInput}
          editorDidMount={editorDidMount}
        />
        <button onClick={handleSubmit} disabled={loading}>
          Submit Code
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 10rem);
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
