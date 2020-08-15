import React from "react";
import styled from "styled-components";
import ScaleLoader from "react-spinners/ScaleLoader";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--panel-height) * 0.75);
`;

const Spinner = () => {
  return (
    <Container>
      <ScaleLoader color="var(--text-color)" />
    </Container>
  );
};

export default Spinner;
