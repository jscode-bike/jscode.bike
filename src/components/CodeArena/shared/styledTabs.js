import styled from "styled-components";
import { TabList, Tab } from "react-tabs";

export const TabListStyled = styled(TabList)`
  display: flex;
  height: var(--tab-height);
  align-items: stretch;
  list-style: none;
  background-color: var(--bg-color-dark);
  padding: 0;
`;

export const TabStyled = styled(Tab)`
  padding: var(--spacing-small) var(--spacing-medium);
  cursor: pointer;
  user-select: none;
  background-color: ${({ selected }) =>
    selected ? "var(--bg-color)" : "var(--bg-color-dark)"};
  outline: none;

  :hover {
    background-color: ${({ selected }) =>
      selected ? "var(--bg-color)" : "var(--bg-color-darker)"};
  }
`;
