import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { getCssVariableNumberValue } from "../../../utils/utils.js";
import Button from "../../shared/Button.js";
import { ArenaContext } from "../ArenaContext.js";
import MonacoEditor from "react-monaco-editor";

const EditorPanelContainer = styled.div``;

const EditorPanel = () => {
  const editorRef = useRef(null);
  const {
    editorTheme,
    code,
    setCode,
    trySubmission,
    loading,
    resetCode,
    handlePrettify,
    toggleEditorTheme,
    setTabIdx,
  } = useContext(ArenaContext);
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
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", resizeFn);
    return () => {
      window.removeEventListener("resize", resizeFn);
    };
  }, [editorRef, setTabIdx]);
  return (
    <EditorPanelContainer>
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
      <ButtonPanelContainer>
        <SubmitButton onClick={trySubmission} disabled={loading}>
          Submit Code
        </SubmitButton>
        <ResetButton onClick={resetCode}>⎌</ResetButton>
        <BeautifyButton onClick={handlePrettify}>{"{}"}</BeautifyButton>
        <ToggleThemeButton onClick={toggleEditorTheme}>
          {{ "vs-dark": "☼", vs: "☾" }[editorTheme]}
        </ToggleThemeButton>
      </ButtonPanelContainer>
    </EditorPanelContainer>
  );
};

const ButtonPanelContainer = styled.div`
  /* width: 100%;
  margin: var(--spacing-small) 0 var(--spacing-medium) 0;
  height: var(--button-panel-height);
  display: inline-flex;
  gap: var(--spacing-small);
  align-items: stretch; */
`;

const SubmitButton = styled(Button)`
  background-color: var(--color-green);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  flex-grow: 1;
`;

const BeautifyButton = styled(Button)`
  background-color: var(--color-blue);
  width: calc(var(--tab-height) * 1.618);
  padding: 0 var(--spacing-medium);
`;
const ResetButton = styled(Button)`
  background-color: var(--color-blue);
  width: calc(var(--tab-height) * 1.618);
  padding: 0 var(--spacing-medium);
  font-size: 1.3rem;
`;

const ToggleThemeButton = styled(Button)`
  background-color: var(--color-blue);
  width: calc(var(--tab-height) * 1.618);
  padding: 0 var(--spacing-medium);
  font-size: 1.1rem;
`;

export default EditorPanel;
