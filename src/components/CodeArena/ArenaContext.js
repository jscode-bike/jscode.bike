import React, { useState, createContext } from "react";

import prettier from "prettier/standalone.js";
import babelParser from "prettier/parser-babel";

import useWindowSize from "react-use/lib/useWindowSize";

import submitCode from "../../utils/submitCode.js";

import { prettifyErrorMessage } from "../../utils/utils.js";
import {
  saveToLocalStorage,
  fetchFromLocalStorage,
} from "../../utils/localStorage.js";

export const ArenaContext = createContext();

const ArenaProvider = (props) => {
  const { startingCode, tests, variableName, instructionComponent } = props;
  const { width } = useWindowSize();
  const isSmallScreen = width < 768;
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tabIdx, setTabIdx] = useState(0);
  const [message, setMessage] = useState({
    type: "initial",
    text: "Submit your code to see results!",
  });
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [code, setCode] = useState(
    fetchFromLocalStorage(variableName) || startingCode || ""
  );
  const trySubmission = async () => {
    if (loading) return;
    setTabIdx(1);
    setLoading(true);
    setResults(null);
    try {
      const submissionResults = await submitCode(code, tests, variableName);
      saveToLocalStorage(variableName, code, submissionResults);
      setResults(submissionResults);
    } catch (error) {
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
      setTabIdx(1);
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
    tabIdx,
    setTabIdx,
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
    instructionComponent,
    isSmallScreen,
  };
  return (
    <ArenaContext.Provider value={value}>
      {props.children}
    </ArenaContext.Provider>
  );
};

export default ArenaProvider;
