import React, { useState } from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Outputs = ({ outputs }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapseIcon = isCollapsed ? "▸" : "▾";
  return (
    <OutputsContainer>
      <ConsoleHeading onClick={(_e) => setIsCollapsed((c) => !c)}>
        <span>{collapseIcon}</span>
        <span>console</span>
      </ConsoleHeading>
      {!isCollapsed &&
        outputs.map((o, idx) => {
          const codeString = `${o.args.map((a) => a.text).join(" ")}`;
          return (
            <ConsoleOutputContainer key={idx}>
              <SyntaxHighlighterContainer
                language="javascript"
                style={vs2015}
                customStyle={{
                  margin: 0,
                  padding: "var(--spacing-small)",
                  backgroundColor: "var(--bg-color-darker)",
                }}
              >
                {codeString}
              </SyntaxHighlighterContainer>
            </ConsoleOutputContainer>
          );
        })}
    </OutputsContainer>
  );
};

const SyntaxHighlighterContainer = styled(SyntaxHighlighter)`
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
`;

const ConsoleOutputContainer = styled.div``;

const OutputsContainer = styled.div`
  background-color: var(--bg-color-darker);
  width: calc(
    calc(100vw * 4 / 9) - calc(var(--spacing-medium) * 4) -
      calc(var(--spacing-small) * 3)
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
