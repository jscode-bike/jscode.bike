import React, { useState } from "react";
import styled from "styled-components";
import LeftPanel from "./LeftPanel/LeftPanel.js";
import RightPanel from "./RightPanel/RightPanel.js";
import Header from "./Header/Header.js";

const CodeArena = ({
  variableName,
  startingCode,
  tests,
  solutions,
  instructionComponent,
}) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [leftPanelTabIdx, setLeftPanelTabIdx] = useState(0);
  const [message, setMessage] = useState({
    type: "initial",
    text: "Submit your code to see results!",
  });
  return (
    <Container>
      <Header />
      <LeftPanel
        {...{
          results,
          loading,
          message,
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
          setMessage,
          loading,
          setLoading,
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 4fr 5fr;
  grid-template-rows: var(--header-height) 1fr;
`;

export default CodeArena;
