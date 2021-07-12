import React, { useContext } from "react";
import styled from "styled-components";
import { ArenaContext } from "../../ArenaContext.js";
import Outputs from "./Outputs.js";

const UnitTestContainer = styled.div`
  align-self: stretch;
  padding: var(--spacing-small);
  font-weight: bolder;
  background-color: var(
    ${({ passed }) => (passed ? "--color-green" : "--color-red-dark")}
  );
`;

const ResultText = styled.div`
  ::-webkit-scrollbar {
    width: var(--spacing-small);
    height: var(--spacing-small);
    cursor: pointer;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--bg-color-darker);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-color);
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--bg-color-dark);
  }
  scrollbar-color: var(--bg-color) var(--bg-color-darker);
  scrollbar-width: var(--spacing-small);
  font-size: 0.9rem;
  overflow-x: auto;
`;

const Runtime = styled.div`
  font-size: 0.6rem;
  padding-left: var(--spacing-small);
  display: flex;
  justify-content: flex-end;
`;

const ResultTextContainter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(
    calc(${({ isSmallScreen }) => (isSmallScreen ? "100vw" : "100vw * 4 / 9")}) -
      calc(var(--spacing-medium) * 4) - calc(var(--spacing-small) * 3)
  );
`;

const UnitTest = ({ outputs, passed, error, runtime, idx }) => {
  const renderRuntime = (runtime) => {
    if (runtime === null || runtime === undefined) return null;
    return <Runtime>{`${runtime} ms`}</Runtime>;
  };
  const { isSmallScreen } = useContext(ArenaContext);
  return (
    <UnitTestContainer key={idx} passed={passed}>
      <ResultTextContainter isSmallScreen={isSmallScreen}>
        <ResultText>
          {passed ? "☑ Passed" : `🅧 Not Passing: ${error.message}`}
        </ResultText>
        {renderRuntime(runtime)}
      </ResultTextContainter>
      {!!outputs.length && <Outputs {...{ outputs }} />}
    </UnitTestContainer>
  );
};

export default UnitTest;
