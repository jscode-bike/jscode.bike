import React from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0.5rem;
`;

export const MarkdownWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
