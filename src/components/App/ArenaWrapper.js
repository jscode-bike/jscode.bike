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
    /// refactor using this hook idea:
    // https://juliangaramendy.dev/use-promise-subscription/
    let isMounted = true;
    exercises
      .get(variableName)
      .then((e) => {
        if (isMounted) {
          setExercise(e);
        }
      })
      .catch((_) => {
        if (isMounted) {
          setExercise(false);
        }
      });
    return () => (isMounted = false);
  }, [variableName]);

  if (exercise === null) return <Spinner />;
  if (!exercise) return <NoMatch />;

  const { startingCode, instructionComponent, solutionComponent } = exercise;
  return (
    <ArenaProvider
      {...{
        startingCode,
        variableName,
        instructionComponent,
        solutionComponent,
      }}
    >
      <CodeArena {...exercise} />
    </ArenaProvider>
  );
};

export default ArenaWrapper;
