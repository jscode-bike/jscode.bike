import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  submitCode,
  codeErrorMessage,
  getCssVariableNumberValue,
} from "../../utils/utils.js";
import MonacoEditor from "react-monaco-editor";
import { SidePanel } from "./SidePanel/SidePanel.js";
import styled from "styled-components";
import { js } from "js-beautify";

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
  const handleBeautify = (e) => {
    const beautified = js(code, {
      indent_size: 2,
      indent_char: " ",
    });
    setCode(beautified);
  };
  const submissionCallback = useCallback(trySubmission);
  const beautifyCallback = useCallback(handleBeautify);
  useEffect(() => {
    const cmdSaveFn = async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
        e.preventDefault();
        await submissionCallback();
      }
    };
    const beautifyShortcutFn = (e) => {
      if (e.shiftKey && e.altKey && e.keyCode === 70) {
        e.preventDefault();
        beautifyCallback();
      }
    };
    window.addEventListener("keydown", cmdSaveFn);
    window.addEventListener("keydown", beautifyShortcutFn);
    return () => {
      window.removeEventListener("keydown", cmdSaveFn);
      window.removeEventListener("keydown", beautifyShortcutFn);
    };
  }, [submissionCallback, beautifyCallback]);
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
        width: ((window.innerWidth / 9) * 5) | 0,
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
        <ButtonPanel>
          <SubmitButton
            onClick={trySubmission}
            disabled={loading}
          >
            Submit Code
          </SubmitButton>
          <BeautifyButton onClick={handleBeautify}>{"{}"}</BeautifyButton>
        </ButtonPanel>
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
  font-weight: bolder;
`;

const ButtonPanel = styled.div`
  width: 100%;
  margin: var(--spacing-small) 0;
  height: var(--submit-button-height);
  display: inline-flex;
  gap: var(--spacing-small);
  align-items: stretch;
  /* justify-content: stretch; */
`;

const SubmitButton = styled.button`
  background-color: var(--submit-button-color);
  color: inherit;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: bolder;
  cursor: pointer;
  flex-grow: 1;

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

const BeautifyButton = styled.button`
  background-color: var(--submit-button-color);
  color: inherit;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: bolder;
  cursor: pointer;
  flex-grow: 1;

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
  grid-template-columns: 4fr 5fr;
  grid-template-rows: var(--header-height) 1fr;
`;
