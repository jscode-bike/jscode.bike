import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { getCssVariableNumberValue, debounce } from "../../../utils/utils.js";
import Button from "../../shared/Button.js";
import { ArenaContext } from "../ArenaContext.js";
import Monaco from "../shared/Monaco.js";

const EditorPanel = () => {
  const editorRef = useRef(null);
  const {
    editorTheme,
    trySubmission,
    loading,
    resetCode,
    handlePrettify,
    toggleEditorTheme,
    tabIdx,
  } = useContext(ArenaContext);
  useEffect(() => {
    const resizeFn = debounce(function () {
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
        width:
          window.innerWidth - getCssVariableNumberValue("--spacing-small") * 2,
      });
    });
    if (tabIdx === 2) resizeFn();
    window.addEventListener("resize", resizeFn);
    return () => window.removeEventListener("resize", resizeFn);
  }, [editorRef, tabIdx]);
  return (
    <EditorPanelContainer {...{ tabIdx }}>
      <Monaco {...{ editorRef }} />
      <ButtonPanelContainer>
        <SubmitButton onClick={trySubmission} disabled={loading}>
          Submit Code
        </SubmitButton>
        <ResetButton onClick={resetCode}>⎌</ResetButton>
        <BeautifyButton onClick={handlePrettify}>{"{}"}</BeautifyButton>
        <ToggleThemeButton onClick={toggleEditorTheme}>
          {{ "vs-dark": "☼", vs: "◐", "hc-black": "☾" }[editorTheme]}
        </ToggleThemeButton>
      </ButtonPanelContainer>
    </EditorPanelContainer>
  );
};

const EditorPanelContainer = styled.div`
  display: ${({ tabIdx }) => (tabIdx === 2 ? "block" : "none")};
  padding: var(--spacing-small);
`;

const ButtonPanelContainer = styled.div`
  width: 100%;
  margin-top: var(--spacing-small);
  height: var(--button-panel-height);
  display: inline-flex;
  gap: var(--spacing-small);
  align-items: stretch;
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
