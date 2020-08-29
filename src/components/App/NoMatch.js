import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../shared/Button.js";

const NoMatch = () => {
  return (
    <Container>
      <Message>Uh oh... no page found :(</Message>
      <StyledLink to="/">
        <HomeButton>Home</HomeButton>
      </StyledLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
`;

const Message = styled.h2`
  margin: var(--spacing-medium);
`;

const HomeButton = styled(Button)`
  background-color: var(--bg-color-dark);
  padding: var(--spacing-small) var(--spacing-medium);
`;

const StyledLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
`;

export default NoMatch;
