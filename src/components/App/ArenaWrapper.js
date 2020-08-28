import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import exercises from "../../exercises/index.js";

import CodeArena from "../CodeArena/CodeArena.js";
import ArenaProvider from "../CodeArena/ArenaContext";
import NoMatch from "./NoMatch.js";
import Spinner from "../shared/Spinner.js";

const ArenaWrapper = () => {
  const { variableName } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    exercises
      .get(variableName)
      .then((e) => {
        setExercise(e);
      })
      .catch((_) => {
        setExercise(false);
      });
  }, [variableName]);

  if (exercise === null) return <Spinner />;
  if (!exercise) return <NoMatch />;

  const { startingCode, tests, instructionComponent } = exercise;
  return (
    <ArenaProvider
      {...{
        startingCode,
        tests,
        variableName,
        instructionComponent,
      }}
    >
      <CodeArena {...exercise} />
    </ArenaProvider>
  );
};

export default ArenaWrapper;
