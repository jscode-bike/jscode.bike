import React, { useState, createContext } from "react";

export const LocalStorageContext = createContext();

/**

{version, settings, exercises}
 */

const getInitialStoredData = () =>
  JSON.parse(localStorage.getItem("exercises"));

const LocalStorageProvider = (props) => {
  const version = localStorage.getItem("version");
  if (version !== "1") {
    localStorage.clear();
    localStorage.setItem("version", "1");
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
    localStorage.setItem("exercises", JSON.stringify(newData));
    setStoredExerciseData(newData);
  };

  const clearExerciseData = (variableName) => {
    const newData = { ...allStoredExercisesData };
    delete newData[variableName];
    localStorage.setItem("exercises", JSON.stringify(newData));
    setStoredExerciseData(newData);
  };

  const clearAllExerciseData = () => {
    localStorage.setItem("exercises", "{}");
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
