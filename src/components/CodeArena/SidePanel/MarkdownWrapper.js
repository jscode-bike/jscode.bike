import React from 'react'
import styled from "styled-components";
import s from './MarkdownWrapper.module.css'

const Wrapper = styled.div`
  margin: 0.5rem;
  line-height: 1.8rem;
`;

export const MarkdownWrapper = ({ children }) => {
  return <Wrapper><div className={s.markdownContainer}>{children}</div></Wrapper>;
};
