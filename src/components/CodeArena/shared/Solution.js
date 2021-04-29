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
  const isSolutionUnlocked =
    allStoredExercisesData[variableName]?.solutionUnlocked;
  // the useEffect below is a hack to apply syntax highlighting via monaco rather than importing hljs
  useEffect(() => {
    if (!monacoRef.current) return;
    const elements = document.querySelectorAll("code.language-javascript");
    if (!elements.length) return;
    elements.forEach((element) => {
      const code = element.innerText;
      const colorized = monacoRef.current.editor.colorize(code, "javascript");
      colorized.then((text) => {
        element.innerHTML = text;
      });
    });
  }, [monacoRef]);
  return (
    <MarkdownWrapper {...{ isSmallScreen, editorTheme }}>
      {isSolutionUnlocked ? <SolutionComponent /> : <p>solve it first</p>}
    </MarkdownWrapper>
  );
};

export default Solution;
