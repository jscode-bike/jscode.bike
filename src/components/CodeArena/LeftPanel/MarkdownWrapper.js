import React from "react";
import styled from "styled-components";
import "highlight.js/styles/vs2015.css";

const Wrapper = styled.div`
  ::-webkit-scrollbar {
    width: var(--spacing-small);
  }
  ::-webkit-scrollbar-track {
    background-color: var(--bg-color);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-color-dark);
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--bg-color-darker);
  }
  overflow-y: scroll;
  max-height: calc(100vh - var(--header-height) - var(--tab-height));
  scrollbar-width: var(--spacing-small);

  --line-height: 2.2rem;

  line-height: var(--line-height);
  padding: var(--spacing-medium);
  font-size: 1.2rem;
  letter-spacing: 1px;

  h1 {
    margin: 0 0 var(--spacing-medium) 0;
  }

  code {
    padding: 5px var(--spacing-small);
    background-color: var(--bg-color-dark);
    letter-spacing: 1px;
  }
`;

const MarkdownWrapper = ({ children }) => <Wrapper>{children}</Wrapper>;

export default MarkdownWrapper;
