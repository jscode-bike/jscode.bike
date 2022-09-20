import React, { useContext } from "react";
import styled from "styled-components";
import { Tabs, TabPanel } from "react-tabs";
import { ArenaContext } from "../ArenaContext.js";
import { TabStyled, TabListStyled } from "../shared/styledTabs.js";
import Instructions from "../shared/Instructions.js";
// import Solution from "../shared/Solution.js";
import ResultsPanel from "../shared/Results/ResultsPanel.js";

const LeftPanel = () => {
  const { tabIdx, setTabIdx } = useContext(ArenaContext);
  return (
    <LeftPanelContaner>
      <Tabs selectedIndex={tabIdx} onSelect={setTabIdx}>
        <TabListStyled>
          <TabStyled>Instructions</TabStyled>
          <TabStyled>Results</TabStyled>
          {/* <TabStyled>Solution</TabStyled> */}
        </TabListStyled>
        <TabPanel>
          <Instructions />
        </TabPanel>
        <TabPanel>
          <ResultsPanel />
        </TabPanel>
        {/* <TabPanel>
          <Solution />
        </TabPanel> */}
      </Tabs>
    </LeftPanelContaner>
  );
};

const LeftPanelContaner = styled.div``;

export default LeftPanel;
