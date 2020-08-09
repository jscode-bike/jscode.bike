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
  loading,
  setLoading,
}) => {
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [code, setCode] = useState(startingCode || "");
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
  const beautifyCallback = useCallback(handlePrettify);
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
        }}
      />
    </RightPanelContainer>
  );
};

const RightPanelContainer = styled.div`
  border-top: var(--tab-height) solid var(--bg-color-dark);
  height: calc(100vh - var(--header-height) - var(--tab-height));
  padding-right: var(--spacing-medium);
`;

export default RightPanel;
