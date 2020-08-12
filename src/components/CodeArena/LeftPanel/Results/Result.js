import React from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Result = ({ result: { description, unitTestResults } }) => {
  return (
    <ResultContainer>
      <Description>{description}</Description>
      <UnitTestsContainer>
        {unitTestResults.map((u, idx) => {
          const { outputs, passed, error } = u;
          return (
            <UnitTestContainer key={idx} passed={passed}>
              <ResultTextContainter>
                {passed ? "☑ Passed" : `🅧 Not Passing: ${error.message}`}
              </ResultTextContainter>
              {!!outputs.length && <Outputs outputs={outputs} />}
            </UnitTestContainer>
          );
        })}
      </UnitTestsContainer>
    </ResultContainer>
  );
};

const ResultTextContainter = styled.div`
  font-family: monospace;
  padding-bottom: var(--spacing-small);
  font-size: 1.4rem;
`;

const OutputsContainer = styled.div`
  background-color: var(--bg-color-darker);
  /* overflow-x: hidden; */
  width: calc(
    calc(100vw * 4 / 9) - calc(var(--spacing-medium) * 4) -
      calc(var(--spacing-small) * 3)
  );
`;

const Outputs = ({ outputs }) => {
  return (
    <OutputsContainer>
      <ConsoleHeading>console:</ConsoleHeading>
      {outputs.map((o, idx) => {
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

const ConsoleHeading = styled.h4`
  font-family: monospace;
  padding: var(--spacing-small);
  background-color: var(--bg-color-dark);
`;

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

const UnitTestContainer = styled.div`
  align-self: stretch;
  padding: var(--spacing-small);
  font-weight: bolder;
  background-color: var(
    ${({ passed }) => (passed ? "--color-green" : "--color-red-dark")}
  );
`;

const UnitTestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-medium);
`;

const Description = styled.div`
  padding: var(--spacing-medium) 0;
  font-family: monospace;
  font-size: 1.2rem;
`;

const ResultContainer = styled.div``;

export default Result;
