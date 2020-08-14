import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { arr as exercises } from "../../exercises/index";

import Button from "../shared/Button.js";

const Home = () => {
  return (
    <Container>
      <Hero>Do some JS cardio</Hero>
      <ListContainer>
        {exercises.map((e) => {
          return (
            <StyledLink key={e.variableName} to={`/${e.variableName}`}>
              <ExerciseButton>{e.name}</ExerciseButton>
            </StyledLink>
          );
        })}
      </ListContainer>
    </Container>
  );
};

const Hero = styled.div`
  font-size: 2rem;
  margin: var(--spacing-medium);
`;

const ExerciseButton = styled(Button)`
  background-color: var(--bg-color-dark);
  padding: var(--spacing-small) var(--spacing-medium);
`;

const ListContainer = styled.div`
  display: flex;
  gap: var(--spacing-small);
`;

const StyledLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Home;
