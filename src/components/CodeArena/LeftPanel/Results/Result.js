import React from "react";
import styled from "styled-components";

const Result = ({ result: { description, unitTestResults } }) => {
  return (
    <ResultContainer>
      <Description>{description}</Description>
      {unitTestResults.map((u, idx) => {
        const { outputs, passed, error } = u;
        return (
          <UnitTestContainer key={idx} passed={passed}>
            <code>
              {passed ? "☑ Passed" : `🅧 Not Passing: ${error.message}`}
            </code>
            {!!outputs.length && <Outputs outputs={outputs} />}
          </UnitTestContainer>
        );
      })}
    </ResultContainer>
  );
};

const Outputs = ({ outputs }) => {
  // need to make this component more legit...
  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <h6>outputs:</h6>
      {outputs.map((o, idx) => {
        // once output model has changed, make syntax highlighting etc legit
        return <div key={idx}>{`${o.args.map((a) => a.text).join(" ")}`}</div>;
      })}
    </div>
  );
};

const UnitTestContainer = styled.div`
  align-self: stretch;
  padding: var(--spacing-small);
  font-weight: bolder;
  background-color: var(
    ${({ passed }) => (passed ? "--color-green" : "--color-red-dark")}
  );
`;

const Description = styled.div`
  padding: var(--spacing-medium) 0;
  font-family: monospace;
  font-size: 1.2rem;
`;

const ResultContainer = styled.div``;

export default Result;
