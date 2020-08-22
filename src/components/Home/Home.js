import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { arr as exercises } from "../../exercises/index";

import Button from "../shared/Button.js";

const theme = {
  "--text-color": "#f9f5ff",
  "--header-color": "#28262c",

  "--bg-color": "#998fc7",
  "--bg-color-dark": "#14248a",
  "--bg-color-darker": "#28262c",

  "--color-green": "#3e7a43;",
  "--color-green-bright": "#52a158;",
  "--color-yellow": "#d0b61e;",
  "--color-blue": "#1040a8;",
  "--color-red": "#b63d3d;",
  "--color-red-dark": "#993333;",
  "--color-red-bright": "#cb6363;",
};
const root = document.documentElement;

const handleThemeChange = (e) => {
  Object.entries(theme).forEach((entry) => {
    const [key, val] = entry;
    root.style.setProperty(key, val);
  });
};

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
      <ExerciseButton onClick={handleThemeChange}>change theme</ExerciseButton>
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
