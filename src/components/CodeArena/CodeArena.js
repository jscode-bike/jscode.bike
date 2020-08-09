import React, { useState } from "react";
import styled from "styled-components";
import LeftPanel from "./LeftPanel/LeftPanel.js";
import RightPanel from "./RightPanel/RightPanel.js";

export const CodeArena = ({
  name,
  variableName,
  description,
  startingCode,
  tests,
  solutions,
  instructionComponent,
}) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [leftPanelTabIdx, setLeftPanelTabIdx] = useState(0);
  return (
    <Container>
      <Header>JS Code Ninja</Header>
      <LeftPanel
        {...{
          name,
          description,
          results,
          loading,
          instructionComponent,
          tabIdx: leftPanelTabIdx,
          setTabIdx: setLeftPanelTabIdx,
        }}
      />
      <RightPanel
        {...{
          startingCode,
          variableName,
          tests,
          setLeftPanelTabIdx,
          setResults,
          loading,
          setLoading,
        }}
      />
    </Container>
  );
};

const Header = styled.header`
  width: 100%;
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color-darker);
  font-weight: bolder;
`;

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 4fr 5fr;
  grid-template-rows: var(--header-height) 1fr;
`;
