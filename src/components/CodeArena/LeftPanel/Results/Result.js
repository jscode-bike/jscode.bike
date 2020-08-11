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
            <code>{passed ? "☑ passed" : `🅧 failed: ${error.message}`}</code>
            {!!outputs.length && <Outputs outputs={outputs} />}
          </UnitTestContainer>
        );
      })}
    </ResultContainer>
  );
};

const Outputs = ({ outputs }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <h6>outputs:</h6>
      {outputs.map((o, idx) => {
        // once output model has changed, make syntax highlighting etc legit
        return <div key={idx}>{`${o.args.join(" ")}`}</div>;
      })}
    </div>
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

const Description = styled.code`
  padding: var(--spacing-medium) 0;
  font-size: 1.2rem;
`;

const ResultContainer = styled.div`
  margin: var(--spacing-small) var(--spacing-medium);
`;

export default Result;
