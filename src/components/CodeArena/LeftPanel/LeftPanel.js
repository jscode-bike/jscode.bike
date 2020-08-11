import React from "react";
import styled from "styled-components";
import { Results } from "./Results/Results.js";
import { MarkdownWrapper } from "./MarkdownWrapper.js";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Loading from "./Results/Loading.js";

const LeftPanel = ({
  results,
  loading,
  message,
  instructionComponent: Instructions,
  tabIdx,
  setTabIdx,
}) => {
  return (
    <LeftPanelContaner>
      <Tabs selectedIndex={tabIdx} onSelect={setTabIdx}>
        <TabListStyled>
          <TabStyled>Instructions</TabStyled>
          <TabStyled>Results</TabStyled>
        </TabListStyled>
        <TabPanel>
          <MarkdownWrapper>
            <Instructions />
          </MarkdownWrapper>
        </TabPanel>
        <TabPanel>
          {loading ? (
            <Loading />
          ) : (
            <Results {...{ results, message }} />
          )}
        </TabPanel>
      </Tabs>
    </LeftPanelContaner>
  );
};

const TabListStyled = styled(TabList)`
  display: flex;
  height: var(--tab-height);
  align-items: stretch;
  list-style: none;
  background-color: var(--bg-color-dark);
  padding: 0;
`;

const TabStyled = styled(Tab)`
  padding: var(--spacing-small) var(--spacing-medium);
  cursor: pointer;
  user-select: none;
  background-color: ${({ selected }) =>
    selected ? "var(--bg-color)" : "var(--bg-color-dark)"};
  outline: none;

  :hover {
    background-color: ${({ selected }) =>
      selected ? "var(--bg-color)" : "var(--bg-color-darker)"};
  }
`;

const LeftPanelContaner = styled.div``;

export default LeftPanel;
