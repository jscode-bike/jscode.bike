import React, { useContext } from "react";
import styled from "styled-components";
import { ArenaContext } from "../ArenaContext.js";
import Button from "../../shared/Button.js";

const ButtonPanel = () => {
  const {
    trySubmission,
    loading,
    handlePrettify,
    editorTheme,
    toggleEditorTheme,
    resetCode,
  } = useContext(ArenaContext);
  return (
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
  );
};

const ButtonPanelContainer = styled.div`
  width: 100%;
  margin: var(--spacing-small) 0 var(--spacing-medium) 0;
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

export default ButtonPanel;
