import React from "react";
import { useParams } from "react-router-dom";

import { obj as exerciseHash } from "../../exercises/index.js";

import CodeArena from "../CodeArena/CodeArena.js";
import ArenaProvider from "../CodeArena/ArenaContext";
import NoMatch from "./NoMatch.js";

const ArenaWrapper = () => {
  const { variableName } = useParams();
  const exercise = exerciseHash[variableName];
  if (!exercise) return <NoMatch />;
  debugger;

  // const { startingCode, tests, instructionComponent } = exercise;
  // return (
  //   <ArenaProvider
  //     {...{
  //       startingCode,
  //       tests,
  //       variableName,
  //       instructionComponent,
  //     }}
  //   >
  //     <CodeArena {...exercise} />
  //   </ArenaProvider>
  // );
  return <div></div>;
};

export default ArenaWrapper;
