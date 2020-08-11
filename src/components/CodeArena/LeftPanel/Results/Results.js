import React from "react";
import styled from "styled-components";
import Message from "./Message.js";
import Result from "./Result.js";

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

const ResultSummary = () => {
  // need to return a result summary from backend also to populate this area
  return <div></div>
};

export const Results = ({ results, message }) => {
  return results ? (
    <ResultsContainer>
      <ResultSummary {...{ results }} />
      {results.map((r, idx) => {
        return <Result key={idx} result={r} />;
      })}
    </ResultsContainer>
  ) : (
    <Message {...{ message }} />
  );
};
