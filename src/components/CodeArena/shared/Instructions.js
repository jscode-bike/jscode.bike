import React, { useContext } from "react";
import { ArenaContext } from "../ArenaContext";
import MarkdownWrapper from "./MarkdownWrapper";

const Instructions = () => {
  const {
    instructionComponent: InstructionsComponent,
    isSmallScreen,
  } = useContext(ArenaContext);
  return (
    <MarkdownWrapper {...{ isSmallScreen }}>
      <InstructionsComponent />
    </MarkdownWrapper>
  );
};

export default Instructions;
