import React from "react";
import styled from "styled-components";
import Result from "./Result.js";

const ResultsSummary = ({ summary }) => {
  const { passed, failed, total } = summary;
  // need to make this nicer and more useful
  // need to make messaging more aware of above values
  return (
    <div>
      you passed {passed} of {total} tests. {failed} tests are not passing
    </div>
  );
};

const Results = ({ results: { summary, testResults } }) => (
  <ResultsContainer>
    <ResultsSummary {...{ summary }} />
    {testResults.map((r, idx) => (
      <Result key={idx} result={r} />
    ))}
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
