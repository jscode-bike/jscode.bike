import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../shared/Button.js";
import DifficultyIndicator from "./DifficultyIndicator.js";

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

const ListItemContainer = styled.div`
  width: 208px;
`;

const ExerciseInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExerciseListItem = ({ exercise: e, passed }) => {
  return (
    <ListItemContainer>
      <StyledLink to={`/${e.variableName}`}>
        <ExerciseButton>
          <ExerciseInfo>
            <div>{e.name}</div>
            {passed && (
              <span role="img" aria-label="completed">
                ✅
              </span>
            )}
          </ExerciseInfo>
          <DifficultyIndicator difficulty={e.difficulty} />
        </ExerciseButton>
      </StyledLink>
    </ListItemContainer>
  );
};

export default ExerciseListItem;
