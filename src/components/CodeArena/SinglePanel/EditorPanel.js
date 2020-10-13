import React, { useContext } from "react";
import styled from "styled-components";
import Button from "../../shared/Button.js";
import { ArenaContext } from "../ArenaContext.js";
import LightWeightEditor from "./LightWeightEditor.js";

const EditorPanel = () => {
  const {
    trySubmission,
    loading,
    resetCode,
    handlePrettify,
    tabIdx,
    tests,
  } = useContext(ArenaContext);
  return (
    <EditorPanelContainer {...{ tabIdx }}>
      <LightWeightEditor />
      <ButtonPanelContainer>
        <SubmitButton onClick={trySubmission} disabled={loading || !tests}>
          {!tests ? "Loading tests..." : "Submit Code"}
        </SubmitButton>
        <ResetButton onClick={resetCode}>⎌</ResetButton>
        <BeautifyButton onClick={handlePrettify}>{"{}"}</BeautifyButton>
      </ButtonPanelContainer>
    </EditorPanelContainer>
  );
};

const EditorPanelContainer = styled.div`
  display: ${({ tabIdx }) => (tabIdx === 2 ? "block" : "none")};
  padding: var(--spacing-medium);
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

export default EditorPanel;
