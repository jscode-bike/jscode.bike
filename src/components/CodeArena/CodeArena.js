import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  submitCode,
  codeErrorMessage,
  getCssVariableNumberValue,
} from "../../utils/utils.js";
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
  useEffect(() => {
    const cmdSaveFn = async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.which === 83) {
        e.preventDefault();
        await submissionCallback();
      }
    };
    window.addEventListener("keydown", cmdSaveFn);
    return () => window.removeEventListener("keydown", cmdSaveFn);
  }, [submissionCallback]);
  useEffect(() => {
    const resizeFn = function () {
      const headerTabAndSubmitHeight =
        getCssVariableNumberValue("--header-height") +
        getCssVariableNumberValue("--submit-button-height") +
        getCssVariableNumberValue("--tab-height") +
        getCssVariableNumberValue("--spacing-small") * 2;
      const height = window.innerHeight - headerTabAndSubmitHeight;
      editorRef.current.layout({
        height,
        width: ((window.innerWidth / 3) * 2) | 0,
      });
    };
    window.addEventListener("resize", resizeFn);
    return () => window.removeEventListener("resize", resizeFn);
  }, []);
  return (
    <Container>
      <Header>JS Code Ninja</Header>
      <SidePanel
        {...{
          name,
          description,
          results,
          loading,
          instructionComponent,
          tabIdx: sidePanelTabIdx,
          setTabIdx: setSidePanelTabIdx,
        }}
      />
      <RightPanel>
        <MonacoEditor
          language="javascript"
          theme="vs-dark"
          value={code}
          options={{
            wordWrap: "on",
            formatOnType: true,
            tabCompletion: "on",
          }}
          onChange={(inputVal) => setCode(inputVal)}
          editorDidMount={(e) => (editorRef.current = e)}
          height="var(--editor-height)"
        />
        <SubmitButton
          onClick={async (e) => await trySubmission()}
          disabled={loading}
        >
          Submit Code
        </SubmitButton>
      </RightPanel>
    </Container>
  );
};

const RightPanel = styled.div`
  border-top: var(--tab-height) solid var(--bg-color-dark);
  height: calc(100vh - var(--header-height) - var(--tab-height));
  padding-right: var(--spacing-small);
`;

const Header = styled.header`
  width: 100%;
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color-darker);
`;

const SubmitButton = styled.button`
  width: 100%;
  margin: var(--spacing-small) 0;
  height: var(--submit-button-height);
  background-color: var(--submit-button-color);
  color: inherit;
  border: none;
  text-transform: uppercase;
  letter-spacing: .2rem;
  font-weight: bolder;
  cursor: pointer;

  :hover {
    background-color: var(--submit-button-hover);
  }

  :active {
    background-color: var(--submit-button-active);
  }

  :disabled {
    opacity: 50%;
    pointer-events: none;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: var(--header-height) 1fr;
`;
