import React, { useEffect, useContext } from "react";
import { ArenaContext } from "../ArenaContext";
import MarkdownWrapper from "./MarkdownWrapper";

const Instructions = () => {
  const {
    instructionComponent: InstructionsComponent,
    isSmallScreen,
    editorTheme,
    monacoRef,
  } = useContext(ArenaContext);

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
      <InstructionsComponent />
    </MarkdownWrapper>
  );
};

export default Instructions;
