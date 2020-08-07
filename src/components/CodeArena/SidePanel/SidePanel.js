import React from "react";
import styled from "styled-components";
import { Results } from "./Results.js";
import { MarkdownWrapper } from "./MarkdownWrapper.js";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import "react-tabs/style/react-tabs.css";

export const SidePanel = ({
  handleSubmit,
  results,
  loading,
  instructionComponent: Instructions,
  tabIdx,
  setTabIdx,
}) => {
  return (
    <Container>
      <Tabs selectedIndex={tabIdx} onSelect={setTabIdx}>
        <TabList>
          <Tab>Instructions</Tab>
          <Tab>Results</Tab>
        </TabList>
        <TabPanel>
          <MarkdownWrapper>
            <Instructions />
          </MarkdownWrapper>
        </TabPanel>
        <TabPanel>
          <Results {...{ results, loading }} />
        </TabPanel>
      </Tabs>
    </Container>
  );
};

const Container = styled.div``;
