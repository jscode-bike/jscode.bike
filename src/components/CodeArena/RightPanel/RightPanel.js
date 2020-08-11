import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import prettier from "prettier/standalone.js";
import babelParser from "prettier/parser-babel";

import { submitCode, codeErrorMessage } from "../../../utils/utils.js";
import ButtonPanel from "./ButtonPanel.js";
import Editor from "./Editor.js";

const RightPanel = ({
  startingCode,
  variableName,
  tests,
  setLeftPanelTabIdx,
  setResults,
  setMessage,
  loading,
  setLoading,
}) => {
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [code, setCode] = useState(startingCode || "");
  const trySubmission = async () => {
    if (loading) return;
    setLeftPanelTabIdx(1);
    setLoading(true);
    setResults(null);
    try {
      const submissionResults = await submitCode(code, tests, variableName);
      setResults(submissionResults);
    } catch (error) {
      setMessage({
        type: "error",
        text: codeErrorMessage(variableName, error),
      });
    }
    setLoading(false);
  };
  const resetCode = () => {
    const confirmMessage =
      "Are you sure you want to reset back to starting code?\n" +
      "Your current input will be deleted";
    // eslint-disable-next-line no-restricted-globals
    const res = confirm(confirmMessage);
    if (res) setCode(startingCode || "");
  };
  const handlePrettify = (e) => {
    const prettifiedCode = prettier.format(code, {
      parser: "babel",
      plugins: [babelParser],
    });
    setCode(prettifiedCode);
  };
  const toggleEditorTheme = (e) => {
    setEditorTheme((currentTheme) => {
      return currentTheme === "vs-dark" ? "vs" : "vs-dark";
    });
  };

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
      <Editor
        {...{
          editorTheme,
          code,
          setCode,
        }}
      />
      <ButtonPanel
        {...{
          trySubmission,
          loading,
          handlePrettify,
          editorTheme,
          toggleEditorTheme,
          resetCode,
        }}
      />
    </RightPanelContainer>
  );
};

const RightPanelContainer = styled.div`
  border-top: var(--tab-height) solid var(--bg-color-dark);
  height: var(--panel-height);
  padding-right: var(--spacing-medium);
`;

export default RightPanel;
