import React from "react";
import styled from "styled-components";
import ScaleLoader from "react-spinners/ScaleLoader";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc((calc(100vh - var(--header-height) - var(--tab-height))) * 0.6);
`;

const Loading = () => {
  return (
    <Container>
      <ScaleLoader color="var(--text-color)" />
    </Container>
  );
};

export default Loading;
