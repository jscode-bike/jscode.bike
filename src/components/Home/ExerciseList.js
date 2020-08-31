import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../shared/Button.js";
const StyledLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
`;

const ExerciseButton = styled(Button)`
  background-color: var(--bg-color-dark);
  padding: var(--spacing-small) var(--spacing-medium);
  width: 100%;
  text-align: initial;
`;

/// features to build:
// solved indicator
// reset progress button
// difficulty

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
`;
const ListItemContainer = styled.div``;

const ExerciseList = ({ exercises }) => {
  console.log(exercises);
  return (
    <ListContainer>
      {exercises.map((e) => (
        <ExerciseListItem key={e.variableName} exercise={e} />
      ))}
    </ListContainer>
  );
};

const LevelBar = styled.div`
  width: 1rem;
  height: var(--spacing-small);
  background-color: ${({ color }) => color};
`;

const DifficultyContainer = styled.div`
  display: flex;
  margin-top: var(--spacing-small);
  gap: var(--spacing-small);
`;

const DifficultyIndicator = ({ difficulty: d }) => {
  const colors = {
    1: "var(--color-green)",
    2: "var(--color-green-bright)",
    3: "var(--color-yellow)",
    4: "var(--color-red-bright)",
    5: "var(--color-red)",
  };
  const getColor = (idx) => {
    if (idx + 1 > d) return "var(--bg-color)";
    return colors[idx + 1];
  };
  return (
    <DifficultyContainer>
      {Array.from({ length: 5 }).map((_, idx) => {
        return <LevelBar key={idx} color={getColor(idx)} />;
      })}
    </DifficultyContainer>
  );
};

const ExerciseListItem = ({ exercise: e }) => {
  return (
    <ListItemContainer>
      <StyledLink to={`/${e.variableName}`}>
        <ExerciseButton>
          <div>{e.name}</div>
          <DifficultyIndicator difficulty={e.difficulty} />
        </ExerciseButton>
      </StyledLink>
    </ListItemContainer>
  );
};

export default ExerciseList;
