import React from 'react'
import styled from "styled-components";

const ResultsSummary = ({ summary }) => {
  const { passed, total } = summary;
  // need to make this nicer and more useful
  // need to make messaging more aware of above values
  const isPassing = passed === total;
  const icon = isPassing ? "☑" : "🅧";
  const text = isPassing ? "PASSED" : "Not Passing";
  const ratio = `${passed}/${total}`;

  return (
    <SummaryContainer {...{ isPassing }}>
      <SummaryIcon {...{ isPassing }}>{icon}</SummaryIcon>
      <SummaryText>{text}</SummaryText>
      <SummaryRatio>{ratio}</SummaryRatio>
    </SummaryContainer>
  );
};

const SummaryContainer = styled.code`
  margin: var(--spacing-medium) var(--spacing-medium) 0;
  padding: var(--spacing-medium);
  background-color: var(
    ${({ isPassing }) => (isPassing ? "--color-green-bright" : "--color-red")}
  );
  display: flex;
  align-items: center;
  gap: var(--spacing-small);
  height: var(--summary-container-height);
`;

const SummarySpan = styled.span`
  /* padding-bottom: var(--spacing-small); */
  font-size: 1.5rem;
`;

const SummaryIcon = styled(SummarySpan)`
  /* padding-bottom: var(--spacing-small); */
  font-size: ${({ isPassing }) => (isPassing ? "1.8rem" : "1.5rem")};
`;
const SummaryText = styled(SummarySpan)`
  flex-grow: 1;
`;
const SummaryRatio = styled(SummarySpan)`
  font-size: 1rem;
`;

export default ResultsSummary
