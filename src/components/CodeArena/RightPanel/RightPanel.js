import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  submitCode,
  codeErrorMessage,
} from "../../../utils/utils.js";
import { js } from "js-beautify";
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
  //   const editorRef = useRef(null);
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
  const toggleEditorTheme = (e) => {
    setEditorTheme((currentTheme) => {
      return currentTheme === "vs-dark" ? "vs" : "vs-dark";
    });
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
          handleBeautify,
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
