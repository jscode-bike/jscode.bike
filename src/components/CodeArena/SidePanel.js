import React from "react";
import Result from "./Result.js";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: .5rem;
`;

const MarkdownWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export const SidePanel = ({
  handleSubmit,
  results,
  loading,
  instructionComponent: Instructions,
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
      <MarkdownWrapper>
        <Instructions />
      </MarkdownWrapper>
      <button onClick={handleSubmit} disabled={loading}>
        submit
      </button>
      {renderResults()}
    </Container>
  );
};

const Container = styled.div``;
