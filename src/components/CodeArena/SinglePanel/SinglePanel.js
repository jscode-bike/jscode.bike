import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Tabs, TabPanel } from "react-tabs";

import { TabStyled, TabListStyled } from "../shared/styledTabs.js";
import Instructions from "../shared/Instructions.js";
import ResultsPanel from "../shared/Results/ResultsPanel.js";
import EditorPanel from "./EditorPanel.js";
import { ArenaContext } from "../ArenaContext.js";

const SinglePanel = () => {
  const { tabIdx, setTabIdx } = useContext(ArenaContext);
  useEffect(() => () => setTabIdx(0), [setTabIdx]);
  return (
    <SinglePanelContainer>
      <Tabs selectedIndex={tabIdx} onSelect={setTabIdx}>
        <TabListStyled>
          <TabStyled>Instructions</TabStyled>
          <TabStyled>Results</TabStyled>
          <TabStyled>Editor</TabStyled>
        </TabListStyled>
        <TabPanel>
          <Instructions />
        </TabPanel>
        <TabPanel>
          <ResultsPanel />
        </TabPanel>
        <TabPanel>
          <EditorPanel />
        </TabPanel>
      </Tabs>
    </SinglePanelContainer>
  );
};

const SinglePanelContainer = styled.div``;

export default SinglePanel;
