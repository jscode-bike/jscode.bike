import React from "react";
import styled from "styled-components";
import Result from "./Result.js";
import ResultsSummary from './ResultsSummary.js'

const TestResultsContainer = styled.div`
  background-color: var(--bg-color-dark);
  margin: 0 var(--spacing-medium) var(--spacing-medium);
  padding: 0 var(--spacing-medium) var(--spacing-medium);
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
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--bg-color);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-color-dark);
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--bg-color-darker);
  }
  overflow-y: scroll;
  max-height: var(--panel-height);
  scrollbar-width: var(--spacing-small);

  display: flex;
  flex-direction: column;
`;

export default Results;
