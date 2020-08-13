import React from "react";
import styled from "styled-components";

const Header = () => {
  return <HeaderContainer>JS Code Bike</HeaderContainer>;
};

const HeaderContainer = styled.header`
  width: 100%;
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color-darker);
  font-weight: bolder;
`;

export default Header;
