import React, { useState, createContext } from "react";

export const LocalStorageContext = createContext();

const EXERCISES = "exercises",
  VERSION = "version";
/**

{version, settings, exercises}
 */

const getInitialStoredData = () => JSON.parse(localStorage.getItem(EXERCISES));

const LocalStorageProvider = (props) => {
  const version = localStorage.getItem(VERSION);
  if (version !== "0") {
    localStorage.clear();
    localStorage.setItem(VERSION, "0");
  }
  const [allStoredExercisesData, setStoredExerciseData] = useState(
    getInitialStoredData() || {}
  );

  const saveExerciseData = (variableName, code, submissionResults) => {
    const oldProblemData = allStoredExercisesData[variableName];
    const { total, passed: p } = submissionResults.summary;
    const passed = total === p;

    if (oldProblemData?.passed && !passed) return;
    const o = { code, passed };
    const newData = { ...allStoredExercisesData };
    newData[variableName] = o;
    localStorage.setItem(EXERCISES, JSON.stringify(newData));
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
      }}
    >
      {props.children}
    </LocalStorageContext.Provider>
  );
};

export default LocalStorageProvider;
