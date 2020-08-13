import React, { useState } from "react";

import prettier from "prettier/standalone.js";
import babelParser from "prettier/parser-babel";

import { submitCode, prettifyErrorMessage } from "../../utils/utils.js";

export const ArenaContext = React.createContext();

const ArenaProvider = (props) => {
  // please pass in these props to the provider:
  const { startingCode, tests, variableName, instructionComponent } = props;

  // from CodeArena.js
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [leftPanelTabIdx, setLeftPanelTabIdx] = useState(0);
  const [message, setMessage] = useState({
    type: "initial",
    text: "Submit your code to see results!",
  });

  // from RightPanel.js
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
      debugger;
      const { error: text, rawError } = error;
      setMessage({
        type: "error",
        text,
        rawError,
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
    try {
      const prettifiedCode = prettier.format(code, {
        parser: "babel",
        plugins: [babelParser],
      });
      setCode(prettifiedCode);
    } catch (error) {
      console.error(error);
      setResults(null);
      setMessage({
        type: "error",
        text: prettifyErrorMessage(variableName, error),
      });
      setLeftPanelTabIdx(1);
    }
  };
  const toggleEditorTheme = (e) => {
    setEditorTheme((currentTheme) => {
      return currentTheme === "vs-dark" ? "vs" : "vs-dark";
    });
  };

  const value = {
    results,
    setResults,
    loading,
    setLoading,
    leftPanelTabIdx,
    setLeftPanelTabIdx,
    message,
    setMessage,
    editorTheme,
    setEditorTheme,
    code,
    setCode,
    trySubmission,
    resetCode,
    handlePrettify,
    toggleEditorTheme,
    instructionComponent
  };
  return (
    <ArenaContext.Provider value={value}>
      {props.children}
    </ArenaContext.Provider>
  );
};

export default ArenaProvider;
