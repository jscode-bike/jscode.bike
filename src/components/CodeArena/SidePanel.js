import React from 'react';
import Result from './Result.js'
import styled from 'styled-components';

export const SidePanel = ({ name, description, handleSubmit, results }) => {
  return (
    <Container>
      <h3>{name}</h3>
      <p>{description}</p>
      <button onClick={handleSubmit}>submit</button>
      {results && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {results.map((r) => {
            return <Result result={r} />;
          })}
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`

`