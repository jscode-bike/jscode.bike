import React from "react";
import Result from "./Result.js";
import styled from "styled-components";

export const SidePanel = ({
  name,
  description,
  handleSubmit,
  results,
  loading,
  c
}) => {
  const Description = c;
  const renderResults = () => {
    return loading ? <div>loading...</div> :(
      results && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {results.map((r, idx) => {
            return <Result key={idx} result={r} />;
          })}
        </div>
      )
    );
  }
  console.log(c)
  return (
    <Container>
      <h3>{name}</h3>
      {/* <p>{description}</p> */}
      <Description />
      <button onClick={handleSubmit} disabled={loading}>
        submit
      </button>
      {renderResults()}
    </Container>
  );
};

const Container = styled.div``;
