import React from "react";
import { useParams } from "react-router-dom";

import { obj as exerciseHash } from "../../exercises/index.js";

import CodeArena from "../CodeArena/CodeArena.js";

const ArenaWrapper = () => {
  const { variableName } = useParams();
  const exercise = exerciseHash[variableName];
  return <CodeArena {...exercise} />;
};

export default ArenaWrapper;
