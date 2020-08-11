import React from "react";
import styled from "styled-components";

const Result = ({ result: { description, unitTestResults } }) => {
  return (
    <ResultContainer>
      <code>{description}</code>
      <div>
        {unitTestResults.map((u, idx) => {
          const { outputs, passed, error } = u;
          return (
            <UnitTestContainer passed={passed}>
              <code>{passed ? "☑ passed" : `🅧 failed: ${error.message}`}</code>
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
            </UnitTestContainer>
          );
        })}
      </div>
    </ResultContainer>
  );
};

const UnitTestContainer = styled.div`
  align-self: stretch;
  margin: var(--spacing-small) 0;
  padding: var(--spacing-small);
  font-weight: bolder;
  background-color: var(
    ${({ passed }) => (passed ? "--color-green-bright" : "--color-red")}
  );
`;

const ResultContainer = styled.div`
  margin: var(--spacing-medium);
`;

export default Result;
