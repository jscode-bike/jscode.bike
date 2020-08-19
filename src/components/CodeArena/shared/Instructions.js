import React, { useContext } from "react";
import { ArenaContext } from "../ArenaContext";
import MarkdownWrapper from "./MarkdownWrapper";

const Instructions = () => {
  const { instructionComponent: InstructionsComponent } = useContext(
    ArenaContext
  );
  return (
    <MarkdownWrapper>
      <InstructionsComponent />
    </MarkdownWrapper>
  );
};

export default Instructions;
