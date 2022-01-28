import React from "react";
import styled from "styled-components";

import { arr as exercises } from "../../exercises/index.js";

import ExerciseList from "./ExerciseList/ExerciseList.js";

import OpacityTransition from "../shared/OpacityTransition.js";
import Footer from "./Footer.js";
import JScodeBikeLogo from "../../assets/JScodeBikeLogo.js";

/// need to add:
// about, privacy, terms, contact

const Home = () => {
  return (
    <OpacityTransition>
      <Container>
        <Hero>
          <JScodeBikeLogo />
          <h1>JS Code Bike</h1>
          <p>Do some JS cardio</p>
        </Hero>
        <ExerciseList {...{ exercises }} />
        <Footer />
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-color);
`;

export default Home;
