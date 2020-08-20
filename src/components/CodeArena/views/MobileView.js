import React from "react";
import styled from "styled-components";
import SinglePanel from "../SinglePanel/SinglePanel.js";

const MobileContainer = styled.div`
  height: calc(100vh - var(--header-height));
`;

const MobileView = () => (
  <MobileContainer>
    <SinglePanel />
  </MobileContainer>
);

export default MobileView;
