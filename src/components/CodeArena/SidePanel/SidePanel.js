import React from "react";
import styled from "styled-components";
import { Results } from "./Results.js";
import { MarkdownWrapper } from "./MarkdownWrapper.js";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import s from './SidePanel.module.css';

export const SidePanel = ({
  results,
  loading,
  instructionComponent: Instructions,
  tabIdx,
  setTabIdx,
}) => {
  return (
    <Container>
      <Tabs selectedIndex={tabIdx} onSelect={setTabIdx}>
        <TabList
          className={s.tabList}
        >
          <Tab className={s.tab}>Instructions</Tab>
          <Tab className={s.tab}>Results</Tab>
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
