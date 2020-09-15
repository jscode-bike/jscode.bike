import React, { useState } from "react";
import styled from "styled-components";
import Outputs from "./Outputs.js";

const Result = ({ result }) => {
  const { description, unitTestResults, testSummary } = result;
  const { passed, total } = testSummary;
  const isPassing = passed === total;
  const [isCollapsed, setIsCollapsed] = useState(isPassing);
  const collapseIcon = isCollapsed ? "▸" : "▾";
  const ratio = `${passed}/${total}`;
  return (
    <ResultContainer>
      <Description onClick={(_e) => setIsCollapsed(!isCollapsed)}>
        <ToggleCollapse>{collapseIcon}</ToggleCollapse>
        <DescriptionText>{description}</DescriptionText>
        <DescriptionRatio {...{ isPassing }}>{ratio}</DescriptionRatio>
      </Description>
      {!isCollapsed && (
        <UnitTestsContainer>
          {unitTestResults.map((u, idx) => {
            const { outputs, passed, error, runtime } = u;
            return (
              <UnitTestContainer key={idx} passed={passed}>
                <ResultTextContainter>
                  <ResultText>
                    {passed ? "☑ Passed" : `🅧 Not Passing: ${error.message}`}
                  </ResultText>
                  <Runtime>{runtime !== null && `${runtime} ms`}</Runtime>
                </ResultTextContainter>
                {!!outputs.length && <Outputs {...{ outputs }} />}
              </UnitTestContainer>
            );
          })}
        </UnitTestsContainer>
      )}
    </ResultContainer>
  );
};

const ResultTextContainter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ResultText = styled.div`
  font-size: 0.9rem;
`;

const Runtime = styled.div`
  font-size: 0.6rem;
`;

const DescriptionSpan = styled.span``;

const ToggleCollapse = styled(DescriptionSpan)``;
const DescriptionText = styled(DescriptionSpan)`
  flex-grow: 1;
`;
const DescriptionRatio = styled(DescriptionSpan)`
  color: var(
    ${({ isPassing }) =>
      isPassing ? "--color-green-bright" : "--color-red-bright"}
  );
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
  font-size: 1.1rem;
  display: flex;
  gap: var(--spacing-small);
  align-items: center;
  cursor: pointer;
`;

const ResultContainer = styled.div``;

export default Result;
