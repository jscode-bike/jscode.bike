import React from "react";
import styled from "styled-components";
import SinglePanel from "../SinglePanel/SinglePanel.js";
import OpacityTransition from "../../shared/OpacityTransition.js";

const MobileContainer = styled.div`
  height: calc(100vh - var(--header-height));
  background: var(--bg-color);
`;

const MobileView = () => (
  <OpacityTransition>
    <MobileContainer>
      <SinglePanel />
    </MobileContainer>
  </OpacityTransition>
);

export default MobileView;
