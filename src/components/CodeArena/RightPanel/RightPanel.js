import React from "react";
import styled from "styled-components";
import ButtonPanel from "./ButtonPanel.js";
import Editor from "./Editor.js";

const RightPanel = () => {
  return (
    <RightPanelContainer>
      <Editor />
      <ButtonPanel />
    </RightPanelContainer>
  );
};

const RightPanelContainer = styled.div`
  border-top: var(--tab-height) solid var(--bg-color-dark);
  height: var(--panel-height);
  padding-right: var(--spacing-medium);
`;

export default RightPanel;
