import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useRef,
} from "react";

import prettier from "prettier/standalone.js";
import babelParser from "prettier/parser-babel";

import useWindowSize from "react-use/lib/useWindowSize";

import submitCode from "../../utils/submitCode.js";

import { prettifyErrorMessage } from "../../utils/utils.js";
import {
  saveToLocalStorage,
  fetchFromLocalStorage,
} from "../../utils/localStorage.js";
import exercises from "../../exercises/index.js";

export const ArenaContext = createContext();

/// lot of tech debt in this component
const ArenaProvider = (props) => {
  const { startingCode, variableName, instructionComponent } = props;
  const { width } = useWindowSize();
  const [tests, setTests] = useState(null);
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
  const monacoRef = useRef(null);
  const trySubmission = async () => {
    if (!tests) return;
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
    const themes = ["vs-dark", "vs", "hc-black"];
    setEditorTheme((currentTheme) => {
      const idx = themes.indexOf(currentTheme);
      return themes[(idx + 1) % 3];
    });
  };

  // listeners from RightPanel
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

  useEffect(() => {
    exercises.getTests(variableName).then((fetchedTests) => {
      setTests(fetchedTests);
    });
  }, [variableName]);
  const value = {
    tests,
    results,
    loading,
    tabIdx,
    setTabIdx,
    monacoRef,
    message,
    editorTheme,
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
