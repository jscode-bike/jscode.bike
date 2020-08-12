import React from "react";
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
  overflow-y: scroll;

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
`;

const Results = ({ results: { summary, testResults } }) => (
  <ResultsContainer>
    <ResultsSummary {...{ summary }} />
    <TestResultsContainer>
      {testResults.map((r, idx) => (
        <Result key={idx} result={r} />
      ))}
    </TestResultsContainer>
  </ResultsContainer>
);

const ResultsContainer = styled.div`
  max-height: var(--panel-height);
  display: flex;
  flex-direction: column;
`;

export default Results;
