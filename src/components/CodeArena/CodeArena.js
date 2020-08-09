import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  submitCode,
  codeErrorMessage,
  getCssVariableNumberValue,
} from "../../utils/utils.js";
import MonacoEditor from "react-monaco-editor";
import { LeftPanel } from "./LeftPanel/LeftPanel.js";
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
  const [leftPanelTabIdx, setLeftPanelTabIdx] = useState(0);
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const editorRef = useRef(null);
  const trySubmission = async () => {
    if (loading) return;
    setLeftPanelTabIdx(1);
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
      wrap_line_length: 80,
      break_chained_methods: true,
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
        getCssVariableNumberValue("--spacing-small") +
        getCssVariableNumberValue("--spacing-medium");
      const height = window.innerHeight - headerTabAndSubmitHeight;
      editorRef.current.layout({
        // height,
        height,
        width:
          ((window.innerWidth / 9) * 5 -
            getCssVariableNumberValue("--spacing-medium")) |
          0,
      });
    };
    window.addEventListener("resize", resizeFn);
    return () => window.removeEventListener("resize", resizeFn);
  }, []);
  const toggleTheme = (e) => {
    setEditorTheme((currentTheme) => {
      return currentTheme === "vs-dark" ? "vs" : "vs-dark";
    });
  };
  return (
    <Container>
      <Header>JS Code Ninja</Header>
      <LeftPanel
        {...{
          name,
          description,
          results,
          loading,
          instructionComponent,
          tabIdx: leftPanelTabIdx,
          setTabIdx: setLeftPanelTabIdx,
        }}
      />
      <RightPanel>
        <MonacoEditor
          language="javascript"
          // theme="vs-dark"
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
        <ButtonPanel>
          <SubmitButton onClick={trySubmission} disabled={loading}>
            Submit Code
          </SubmitButton>
          <BeautifyButton onClick={handleBeautify}>{"{}"}</BeautifyButton>
          <ToggleThemeButton onClick={toggleTheme}>
            {{ vs: "☼", "vs-dark": "☾" }[editorTheme]}
          </ToggleThemeButton>
        </ButtonPanel>
      </RightPanel>
    </Container>
  );
};

const RightPanel = styled.div`
  border-top: var(--tab-height) solid var(--bg-color-dark);
  height: calc(100vh - var(--header-height) - var(--tab-height));
  padding-right: var(--spacing-medium);
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
  margin: var(--spacing-small) 0 var(--spacing-medium) 0;
  height: var(--submit-button-height);
  display: inline-flex;
  gap: var(--spacing-small);
  align-items: stretch;
`;

const Button = styled.button`
  background-color: var(--submit-button-color);
  color: inherit;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: bolder;
  cursor: pointer;
  outline: none;
  width: calc(var(--tab-height) * 1.618);

  :hover {
    filter: brightness(80%)
  }

  :active {
    filter: brightness(55%)
  }

  :disabled {
    opacity: 50%;
    pointer-events: none;
  }
`;

const SubmitButton = styled(Button)`
  flex-grow: 1;
`;

const BeautifyButton = styled(Button)`
  padding: 0 var(--spacing-medium);
`;

const ToggleThemeButton = styled(Button)`
  padding: 0 var(--spacing-medium);
  font-size: 1.1rem;
`;

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 4fr 5fr;
  grid-template-rows: var(--header-height) 1fr;
`;
