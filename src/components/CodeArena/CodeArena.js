import React, { useContext } from "react";
import styled from "styled-components";
import LeftPanel from "./LeftPanel/LeftPanel.js";
import RightPanel from "./RightPanel/RightPanel.js";
import SinglePanel from "./SinglePanel/SinglePanel.js";
import { ArenaContext } from "./ArenaContext.js";

const CodeArena = () => {
  const { isSmallScreen } = useContext(ArenaContext);
  console.log("isSmallScreen?", isSmallScreen);
  return isSmallScreen ? <MobileView /> : <DesktopView />;
};

/// make the views lazy loaded

const DesktopView = () => (
  <DesktopContainer>
    <LeftPanel />
    <RightPanel />
  </DesktopContainer>
);

const MobileView = () => (
  <MobileContainer>
    <SinglePanel />
  </MobileContainer>
);

const MobileContainer = styled.div`
  height: calc(100vh - var(--header-height));
`;

const DesktopContainer = styled.div`
  height: calc(100vh - var(--header-height));
  display: grid;
  grid-template-columns: ${({ isSmallScreen }) =>
    isSmallScreen ? "1fr" : "4fr 5fr"};
  grid-template-rows: 1fr;
`;

export default CodeArena;
