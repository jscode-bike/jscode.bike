import React from "react";
import styled from "styled-components";

import { arr as exercises } from "../../exercises/index.js";

import ExerciseListItem from "./ExerciseListItem.js";

import logo from "../../assets/logo.svg";
import OpacityTransition from "../shared/OpacityTransition.js";

/// need to add:
// about, privacy, terms, contact

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
          {exercises.map((e) => (
            <ExerciseListItem key={e.variableName} exercise={e} />
          ))}
        </ListContainer>
      </Container>
    </OpacityTransition>
  );
};

const Hero = styled.div`
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
  height: 192;
  width: 192;
`;

const ListContainer = styled.div`
  display: flex;
  gap: var(--spacing-small);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Home;
