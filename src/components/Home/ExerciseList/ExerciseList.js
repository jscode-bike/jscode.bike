import React, { useContext } from "react";
import styled from "styled-components";
import ExerciseListItem from "./ExerciseListItem.js";

import { LocalStorageContext } from "../../App/LocalStorageContext.js";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-small);
`;

const ExerciseList = ({ exercises }) => {
  const { allStoredExercisesData } = useContext(LocalStorageContext);
  return (
    <ListContainer>
      {exercises.map((e) => (
        <ExerciseListItem
          key={e.variableName}
          exercise={e}
          passed={allStoredExercisesData[e.variableName]?.passed}
        />
      ))}
    </ListContainer>
  );
};

export default ExerciseList;
