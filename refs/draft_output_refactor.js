import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArenaContext } from "../../ArenaContext";
// import SyntaxHighlighter from "react-syntax-highlighter";

const Outputs = ({ outputs }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapseIcon = isCollapsed ? "▸" : "▾";

  const { isSmallScreen } = useContext(ArenaContext);
  return (
    <OutputsContainer {...{ isSmallScreen }}>
      <ConsoleHeading onClick={(_e) => setIsCollapsed((c) => !c)}>
        <span>{collapseIcon}</span>
        <span>console</span>
      </ConsoleHeading>
      {!isCollapsed &&
        outputs.map((o, idx) => {
          const codeString = `${o.args.map((a) => a.text).join(" ")}`;
          return (
            <ConsoleOutputContainer key={idx}>
              <SyntaxHighlighterContainer>
                <SyntaxHighlighter code={codeString} />
              </SyntaxHighlighterContainer>
            </ConsoleOutputContainer>
          );
        })}
    </OutputsContainer>
  );
};

const SyntaxHighlighter = ({ code }) => {
  const { monacoRef } = useContext(ArenaContext);
  const component = useRef(<div>{code}</div>);
  useEffect(() => {
    if (!monacoRef.current) return;
    monacoRef.current.editor.colorize(code, "javascript").then((xml) => {
      component.current = <div dangerouslySetInnerHTML={{ __html: xml }}></div>;
    });
  });
  return component.current;
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

  margin: 0;
  padding: var(--spacing-small);
  background-color: var(--bg-color-darker);
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
