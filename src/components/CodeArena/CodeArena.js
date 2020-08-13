import React from "react";
import styled from "styled-components";
import LeftPanel from "./LeftPanel/LeftPanel.js";
import RightPanel from "./RightPanel/RightPanel.js";
import Header from "./Header/Header.js";
import ArenaProvider from "./ArenaContext.js";

const CodeArena = ({
  startingCode,
  tests,
  variableName,
  instructionComponent,
}) => {
  return (
    <ArenaProvider
      {...{
        startingCode,
        tests,
        variableName,
        instructionComponent,
      }}
    >
      <Container>
        <Header />
        <LeftPanel />
        <RightPanel />
      </Container>
    </ArenaProvider>
  );
};

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 4fr 5fr;
  grid-template-rows: var(--header-height) 1fr;
`;

export default CodeArena;
