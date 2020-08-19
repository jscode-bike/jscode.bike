import React, { useContext } from "react";
import styled from "styled-components";
import { Tabs, TabPanel } from "react-tabs";

import { TabStyled, TabListStyled } from "../shared/styledTabs.js";
import Instructions from "../shared/Instructions.js";
import ResultsPanel from "../shared/Results/ResultsPanel.js";
import { ArenaContext } from "../ArenaContext.js";

const SinglePanel = () => {
  const { tabIdx, setTabIdx } = useContext(ArenaContext);
  return (
    <SinglePanelContainer>
      <Tabs selectedIndex={tabIdx} onSelect={setTabIdx}>
        <TabListStyled>
          <TabStyled>Instructions</TabStyled>
          <TabStyled>Results</TabStyled>
        </TabListStyled>
        <TabPanel>
          <Instructions />
        </TabPanel>
        <TabPanel>
          <ResultsPanel />
        </TabPanel>
      </Tabs>
    </SinglePanelContainer>
  );
};

const SinglePanelContainer = styled.div``;

export default SinglePanel;
