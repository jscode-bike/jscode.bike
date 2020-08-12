import React from "react";
import styled from "styled-components";
import Outputs from "./Outputs.js";

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
              {!!outputs.length && <Outputs {...{ outputs }} />}
            </UnitTestContainer>
          );
        })}
      </UnitTestsContainer>
    </ResultContainer>
  );
};

const ResultTextContainter = styled.div`
  font-family: monospace;
  font-size: 1.4rem;
`;

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
