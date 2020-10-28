import React from "react";
import styled from "styled-components";

const colors = {
  1: "var(--color-green)",
  2: "var(--color-green-bright)",
  3: "var(--color-yellow)",
  4: "var(--color-red-bright)",
  5: "var(--color-red)",
};
const getBarColor = (barIdx, difficulty) => {
  if (barIdx + 1 > difficulty) return "var(--bg-color)";
  return colors[barIdx + 1];
};

const LevelBar = styled.div`
  width: 1rem;
  height: calc(var(--spacing-small) / 2);
  background-color: ${({ color }) => color};
`;

const DifficultyContainer = styled.div`
  display: flex;
  margin-top: var(--spacing-small);
  gap: var(--spacing-small);
`;

const DifficultyIndicator = ({ difficulty: d }) => {
  return (
    <DifficultyContainer>
      {Array.from({ length: 5 }).map((_, idx) => {
        return <LevelBar key={idx} color={getBarColor(idx, d)} />;
      })}
    </DifficultyContainer>
  );
};

export default DifficultyIndicator;
