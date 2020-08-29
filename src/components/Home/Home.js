import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { arr as exercises } from "../../exercises/index";

import Button from "../shared/Button.js";

import logo from "../../assets/logo.svg";
import OpacityTransition from "../shared/OpacityTransition";

const Home = () => {
  return (
    <OpacityTransition>
      <Container>
        <Hero>
          <LogoImage src={logo} />
          <h1>JS Code Bike</h1>
          <p>Do some JS cardio</p>
        </Hero>
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
    </OpacityTransition>
  );
};

const Hero = styled.div`
  /* font-size: 2rem; */
  margin: var(--spacing-medium);
  padding-bottom: var(--spacing-medium);
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin: var(--spacing-medium) 0 var(--spacing-small) 0;
  }
`;

const LogoImage = styled.img`
  grid-area: "a";
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
