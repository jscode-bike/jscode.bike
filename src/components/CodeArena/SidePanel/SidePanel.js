import React from "react";
import Result from "./Result.js";
import styled from "styled-components";
import { MarkdownWrapper } from "./MarkdownWrapper.js";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import "react-tabs/style/react-tabs.css";

export const SidePanel = ({
  handleSubmit,
  results,
  loading,
  instructionComponent: Instructions,
  tabIdx,
  setTabIdx
}) => {
  const renderResults = () => {
    return loading ? (
      <div>loading...</div>
    ) : (
      results && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {results.map((r, idx) => {
            return <Result key={idx} result={r} />;
          })}
        </div>
      )
    );
  };
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
        <TabPanel>{renderResults()}</TabPanel>
      </Tabs>
    </Container>
  );
};

const Container = styled.div``;
