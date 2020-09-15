import React from "react";
import styled from "styled-components";

const ResultsSummary = ({
  summary,
  isPassing,
  setIsCollapsed,
  isCollapsed,
}) => {
  const { passed, total } = summary;
  const icon = isPassing ? "☑" : "🅧";
  const text = isPassing ? "PASSED" : "Not Passing";
  const ratio = `${passed}/${total}`;
  const collapseIcon = isCollapsed ? "▸" : "▾";

  return (
    <SummaryContainer
      {...{ isPassing }}
      onClick={(_e) => setIsCollapsed((c) => !c)}
    >
      <ToggleCollapse>{collapseIcon}</ToggleCollapse>
      <SummaryIcon {...{ isPassing }}>{icon}</SummaryIcon>
      <SummaryText>{text}</SummaryText>
      <SummaryRatio>{ratio}</SummaryRatio>
    </SummaryContainer>
  );
};

const SummaryContainer = styled.span`
  margin: var(--spacing-medium) var(--spacing-medium) 0;
  padding: var(--spacing-medium);
  background-color: var(
    ${({ isPassing }) => (isPassing ? "--color-green-bright" : "--color-red")}
  );
  display: flex;
  align-items: center;
  gap: var(--spacing-small);
  height: var(--summary-container-height);
  cursor: pointer;
`;

const SummarySpan = styled.span`
  font-size: 1.2rem;
`;

const SummaryIcon = styled(SummarySpan)`
  font-size: 1.2rem;
`;
const SummaryText = styled(SummarySpan)`
  flex-grow: 1;
`;
const SummaryRatio = styled(SummarySpan)`
  font-size: 1rem;
`;

const ToggleCollapse = styled(SummarySpan)``;

export default ResultsSummary;
