import React, { useState, createContext } from "react";

export const LocalStorageContext = createContext();

const EXERCISES = "exercises",
  VERSION = "jscode.bike_version",
  js_code_bike_version = "0";
/**

{version, settings, exercises}
 */

const getInitialStoredData = () => JSON.parse(localStorage.getItem(EXERCISES));

const LocalStorageProvider = (props) => {
  const version = localStorage.getItem(VERSION);
  if (version !== js_code_bike_version) {
    localStorage.clear();
    localStorage.setItem(VERSION, js_code_bike_version);
  }
  const [allStoredExercisesData, setStoredExerciseData] = useState(
    getInitialStoredData() || {}
  );

  const saveExerciseData = (variableName, code, submissionResults) => {
    const oldProblemData = allStoredExercisesData[variableName];
    const { total, passed: p } = submissionResults.summary;
    const passed = total === p;

    if (oldProblemData?.passed && !passed) return;

    const solutionUnlocked = passed ? true : !!oldProblemData?.solutionUnlocked;

    const o = { code, passed, solutionUnlocked };
    const newData = { ...allStoredExercisesData };
    newData[variableName] = o;
    localStorage.setItem(EXERCISES, JSON.stringify(newData));
    setStoredExerciseData(newData);
  };

  const unlockSolution = (variableName) => {
    const newData = { ...allStoredExercisesData };
    newData[variableName].solutionUnlocked = true;
    localStorage.setItem(EXERCISES, newData);
    setStoredExerciseData(newData);
  };

  const clearExerciseData = (variableName) => {
    const newData = { ...allStoredExercisesData };
    delete newData[variableName];
    localStorage.setItem(EXERCISES, JSON.stringify(newData));
    setStoredExerciseData(newData);
  };

  const clearAllExerciseData = () => {
    localStorage.setItem(EXERCISES, "{}");
    setStoredExerciseData({});
  };

  return (
    <LocalStorageContext.Provider
      value={{
        allStoredExercisesData,
        saveExerciseData,
        clearExerciseData,
        clearAllExerciseData,
        unlockSolution,
      }}
    >
      {props.children}
    </LocalStorageContext.Provider>
  );
};

export default LocalStorageProvider;
