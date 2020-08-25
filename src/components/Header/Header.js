import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

const Header = () => {
  return (
    <HeaderContainer>
      <StyledLink to="/">
        <Image src={logo} alt="JS Code Bike" />
      </StyledLink>
    </HeaderContainer>
  );
};

const Image = styled.img`
  height: calc(var(--header-height) * 0.5);
`;

const StyledLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  margin: 0 var(--spacing-medium);
  padding: 0;
  height: calc(var(--header-height) * 0.5);
`;

const HeaderContainer = styled.header`
  width: 100%;
  grid-column: span 2;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  background-color: var(--bg-color-darker);
  font-weight: bolder;
  height: var(--header-height);
`;

export default Header;
