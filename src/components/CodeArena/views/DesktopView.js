import React from "react";
import styled from "styled-components";
import LeftPanel from "../LeftPanel/LeftPanel.js";
import RightPanel from "../RightPanel/RightPanel.js";

const DesktopView = () => (
  <DesktopContainer>
    <LeftPanel />
    <RightPanel />
  </DesktopContainer>
);

const DesktopContainer = styled.div`
  height: calc(100vh - var(--header-height));
  display: grid;
  grid-template-columns: 4fr 5fr;
  grid-template-rows: 1fr;
`;

export default DesktopView;
