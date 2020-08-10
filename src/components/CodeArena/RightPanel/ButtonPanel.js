import React from "react";
import styled from "styled-components";

const ButtonPanel = ({
  trySubmission,
  loading,
  handleBeautify,
  editorTheme,
  toggleEditorTheme,
}) => {
  return (
    <ButtonPanelContainer>
      <SubmitButton onClick={trySubmission} disabled={loading}>
        Submit Code
      </SubmitButton>
      <BeautifyButton onClick={handleBeautify}>{"{}"}</BeautifyButton>
      <ToggleThemeButton onClick={toggleEditorTheme}>
        {{ "vs-dark": "☼", vs: "☾" }[editorTheme]}
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

const Button = styled.button`
  color: inherit;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: bolder;
  cursor: pointer;
  outline: none;
  width: calc(var(--tab-height) * 1.618);

  :hover {
    filter: brightness(80%);
  }

  :active {
    filter: brightness(55%);
  }

  :disabled {
    opacity: 50%;
    pointer-events: none;
  }
`;

const SubmitButton = styled(Button)`
  background-color: var(--color-green);
  flex-grow: 1;
`;

const BeautifyButton = styled(Button)`
  background-color: var(--color-blue);
  padding: 0 var(--spacing-medium);
`;

const ToggleThemeButton = styled(Button)`
  background-color: var(--color-blue);
  padding: 0 var(--spacing-medium);
  font-size: 1.1rem;
`;

export default ButtonPanel;
