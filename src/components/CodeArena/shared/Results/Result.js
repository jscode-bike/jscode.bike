import React, { useState } from "react";
import styled from "styled-components";
import UnitTest from "./UnitTest.js";

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
              <UnitTest
                key={idx}
                {...{ outputs, passed, error, runtime, idx }}
              />
            );
          })}
        </UnitTestsContainer>
      )}
    </ResultContainer>
  );
};

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
