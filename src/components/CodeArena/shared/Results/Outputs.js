import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ArenaContext } from "../../ArenaContext";
import { uuid } from "../../../../utils/utils.js";

const Outputs = ({ outputs }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapseIcon = isCollapsed ? "▸" : "▾";

  const { isSmallScreen, editorTheme } = useContext(ArenaContext);
  return (
    <OutputsContainer {...{ isSmallScreen }}>
      <ConsoleHeading onClick={(_e) => setIsCollapsed((c) => !c)}>
        <span>{collapseIcon}</span>
        <span>console</span>
      </ConsoleHeading>
      {!isCollapsed &&
        outputs.map((o, idx) => {
          const id = "a" + uuid();
          const codeString = `${o.args.map((a) => a.text).join(" ")}`;
          return (
            <ConsoleOutputContainer key={idx}>
              <SyntaxHighlighterContainer {...{ editorTheme }}>
                <SyntaxHighlighter code={codeString} id={id} />
              </SyntaxHighlighterContainer>
            </ConsoleOutputContainer>
          );
        })}
    </OutputsContainer>
  );
};

// below is a very hacky component in order to apply syntax highlighting via monaco
// instead of using react-syntax-highlighter with hljs
const SyntaxHighlighter = ({ code, id }) => {
  const { monacoRef } = useContext(ArenaContext);
  useEffect(() => {
    if (!monacoRef.current) return;
    monacoRef.current.editor.colorize(code, "javascript").then((xml) => {
      document.querySelector("#" + id).innerHTML = xml;
    });
  }, [monacoRef, code, id]);
  return <div id={id}>...</div>;
};

const SyntaxHighlighterContainer = styled.div`
  ::-webkit-scrollbar {
    width: var(--spacing-small);
    height: var(--spacing-small);
    cursor: pointer;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--bg-color-darker);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-color);
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--bg-color-dark);
  }

  overflow-x: auto;

  margin: 0;
  padding: var(--spacing-small);
  background-color: ${({ editorTheme }) => {
    /// this is debt. gotta refactor this into a nicer structure with more accurate colors
    return {
      vs: "white",
      "vs-dark": "var(--bg-color-darker)",
      "hc-black": "black",
    }[editorTheme];
  }};

  font-family: monospace;
  font-size: 1.1rem;
`;

const ConsoleOutputContainer = styled.div``;

const OutputsContainer = styled.div`
  background-color: var(--bg-color-darker);
  width: calc(
    calc(${({ isSmallScreen }) => (isSmallScreen ? "100vw" : "100vw * 4 / 9")}) -
      calc(var(--spacing-medium) * 4) - calc(var(--spacing-small) * 3)
  );
  margin-top: var(--spacing-small);
`;

const ConsoleHeading = styled.h4`
  font-family: monospace;
  padding: var(--spacing-small);
  background-color: var(--bg-color-dark);
  display: flex;
  gap: var(--spacing-small);
  cursor: pointer;
`;

export default Outputs;
