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
`;

/// features to build:
// solved indicator
// reset progress button
// difficulty

const ExerciseListItem = ({ exercise: e }) => {
  return (
    <StyledLink to={`/${e.variableName}`}>
      <ExerciseButton>{e.name}</ExerciseButton>
    </StyledLink>
  );
};

export default ExerciseListItem;
