import React from "react";
import styled from "styled-components";

const Result = ({ result: { description, unitTestResults } }) => {
  return (
    <div>
      <code>{description}</code>
      <div>
        {unitTestResults.map((u, idx) => {
          const { outputs, passed, error } = u;
          return (
            <div
              key={idx}
              style={{
                alignSelf: "stretch",
                backgroundColor: passed ? "green" : "red",
                margin: "1rem",
                padding: "1rem",
              }}
            >
              <p>{passed ? "passed" : `failed: ${error.message}`}</p>
              {outputs.length ? (
                <div
                  style={{
                    backgroundColor: "black",
                  }}
                >
                  <h6>outputs:</h6>
                  {outputs.map((o, idx) => (
                    <div key={idx}>{`${o.args.join(" ")}`}</div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: calc(100vh - var(--header-height) - var(--tab-height));
  scrollbar-width: none;
`;

export const Results = ({ results, loading }) => {
  return !loading ? (
    results ? (
      <ResultsContainer>
        {results.map((r, idx) => {
          return <Result key={idx} result={r} />;
        })}
      </ResultsContainer>
    ) : (
      <div>Submit your code</div>
    )
  ) : (
    <div>loading...</div>
  );
};
