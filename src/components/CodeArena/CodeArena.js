import React, { useContext } from "react";
import styled from "styled-components";
import LeftPanel from "./LeftPanel/LeftPanel.js";
import RightPanel from "./RightPanel/RightPanel.js";
import { ArenaContext } from "./ArenaContext.js";

const CodeArena = () => {
  const { isSmallScreen } = useContext(ArenaContext);
  console.log("isSmallScreen?", isSmallScreen);
  return (
    <Container>
      <LeftPanel />
      <RightPanel />
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - var(--header-height));
  display: grid;
  grid-template-columns: ${({ isSmallScreen }) =>
    isSmallScreen ? "1fr" : "4fr 5fr"};
  grid-template-rows: 1fr;
`;

export default CodeArena;
