import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <StyledLink to="/">JS Code Bike</StyledLink>
    </HeaderContainer>
  );
};

const StyledLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
`;

const HeaderContainer = styled.header`
  width: 100%;
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color-darker);
  font-weight: bolder;
  height: var(--header-height);
`;

export default Header;
