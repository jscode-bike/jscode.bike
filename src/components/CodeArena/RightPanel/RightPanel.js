import React, { useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import ButtonPanel from "./ButtonPanel.js";
import Editor from "./Editor.js";

import { ArenaContext } from "../ArenaContext";

//done?
const RightPanel = () => {
  const { trySubmission, handlePrettify } = useContext(ArenaContext);
  const submissionCallback = useCallback(trySubmission);
  const prettifyCallback = useCallback(handlePrettify);
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
        prettifyCallback();
      }
    };
    window.addEventListener("keydown", cmdSaveFn);
    window.addEventListener("keydown", beautifyShortcutFn);
    return () => {
      window.removeEventListener("keydown", cmdSaveFn);
      window.removeEventListener("keydown", beautifyShortcutFn);
    };
  }, [submissionCallback, prettifyCallback]);

  return (
    <RightPanelContainer>
      <Editor />
      <ButtonPanel />
    </RightPanelContainer>
  );
};

const RightPanelContainer = styled.div`
  border-top: var(--tab-height) solid var(--bg-color-dark);
  height: var(--panel-height);
  padding-right: var(--spacing-medium);
`;

export default RightPanel;
