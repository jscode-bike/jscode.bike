import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ArenaContext } from "../ArenaContext";
import MarkdownWrapper from "./MarkdownWrapper";
import { LocalStorageContext } from "../../App/LocalStorageContext";

const Solution = () => {
  const {
    solutionComponent: SolutionComponent,
    isSmallScreen,
    editorTheme,
    monacoRef,
  } = useContext(ArenaContext);
  const { allStoredExercisesData } = useContext(LocalStorageContext);
  const { variableName } = useParams();
  const isSolved = allStoredExercisesData[variableName]?.passed;
  // the useEffect below is a hack to apply syntax highlighting via monaco rather than importing hljs
  useEffect(() => {
    if (!monacoRef.current) return;
    const element = document.querySelector("code.language-javascript");
    if (!element) return;
    const code = element.innerHTML;
    const colorized = monacoRef.current.editor.colorize(code, "javascript");
    colorized.then((text) => {
      element.innerHTML = text;
    });
  }, [monacoRef]);
  return (
    <MarkdownWrapper {...{ isSmallScreen, editorTheme }}>
      {isSolved ? <SolutionComponent /> : <p>solve it first</p>}
    </MarkdownWrapper>
  );
};

export default Solution;
