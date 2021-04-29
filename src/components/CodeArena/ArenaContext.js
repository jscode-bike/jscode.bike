import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";

import prettier from "prettier/standalone.js";
import babelParser from "prettier/parser-babel";

import useWindowSize from "react-use/lib/useWindowSize";

import runner from "../../runner/runner.js";

import {
  prettifyErrorMessage,
  uuid,
  checkSubmissionId,
} from "../../utils/utils.js";
import exercises from "../../exercises/index.js";
import { LocalStorageContext } from "../App/LocalStorageContext.js";

export const ArenaContext = createContext();

/// lot of tech debt in this component
const ArenaProvider = (props) => {
  const {
    startingCode,
    variableName,
    instructionComponent,
    solutionComponent,
  } = props;
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
  const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    return async () => {
      setIsMounted(false);
      await runner.refreshWorker();
    };
  }, []);
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const {
    allStoredExercisesData,
    saveExerciseData,
    clearExerciseData,
    unlockSolution,
  } = useContext(LocalStorageContext);
  const [code, setCode] = useState(
    allStoredExercisesData[variableName]?.code || startingCode || ""
  );

  const monacoRef = useRef(null);
  const trySubmission = async () => {
    if (!tests) return;
    if (loading) return;
    setTabIdx(1);
    setLoading(true);
    setResults(null);
    try {
      const submissionId = uuid();
      const submissionResults = await runner.submitCode(
        code,
        tests,
        variableName,
        submissionId
      );
      if (!checkSubmissionId(submissionId, submissionResults.submissionId)) {
        return;
      }
      if (!isMounted) return;
      saveExerciseData(variableName, code, submissionResults);
      setResults(submissionResults);
    } catch (error) {
      if (!isMounted) return;
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
      "Your current input and saved progress will be deleted";
    // eslint-disable-next-line no-restricted-globals
    const res = confirm(confirmMessage);
    if (res) {
      clearExerciseData(variableName);
      setCode(startingCode || "");
    }
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
  const submissionCallback = useCallback(trySubmission, [
    tests,
    loading,
    code,
    isMounted,
    saveExerciseData,
    variableName,
  ]);
  const prettifyCallback = useCallback(handlePrettify, [code, variableName]);
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
    solutionComponent,
    unlockSolution,
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
