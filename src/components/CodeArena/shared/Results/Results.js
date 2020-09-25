import React, { useState } from "react";
import styled from "styled-components";
import Result from "./Result.js";
import ResultsSummary from "./ResultsSummary.js";

const TestResultsContainer = styled.div`
  background-color: var(--bg-color-dark);
  margin: 0 var(--spacing-medium) var(--spacing-medium);
  padding: 0 var(--spacing-medium) var(--spacing-medium);
  max-height: calc(
    var(--panel-height) - calc(var(--spacing-medium) * 2) -
      var(--summary-container-height)
  );
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: var(--spacing-small);
    cursor: pointer;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--bg-color-dark);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-color-darker);
  }

  scrollbar-color: var(--bg-color-darker) var(--bg-color-dark);
  scrollbar-width: var(--spacing-small);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-medium);
`;

const Results = ({ results: { summary, testResults } }) => {
  const { passed, total } = summary;
  const isPassing = passed === total;
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <ResultsContainer>
      <ResultsSummary
        {...{ summary, setIsCollapsed, isPassing, isCollapsed }}
      />
      {!isCollapsed && (
        <TestResultsContainer>
          {testResults.map((r, idx) => (
            <Result key={idx} result={r} />
          ))}
        </TestResultsContainer>
      )}
    </ResultsContainer>
  );
};

const ResultsContainer = styled.div`
  max-height: var(--panel-height);
`;

export default Results;
