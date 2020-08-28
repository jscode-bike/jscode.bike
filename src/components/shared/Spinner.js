import React from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--panel-height) * 0.75);
`;

const Spinner = () => {
  return (
    <Container>
      <GridLoader color="var(--text-color)" />
    </Container>
  );
};

export default Spinner;
