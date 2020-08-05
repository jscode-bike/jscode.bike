import React, { useState } from "react";
import { submitCode } from "../../utils/utils";
import MonacoEditor from "react-monaco-editor";

export const CodeArena = ({
  name,
  variableName,
  description,
  startingCode,
  tests,
  solutions,
}) => {
  const [code, setCode] = useState(startingCode || "");
  const [results, setResults] = useState(null);
  const handleEditorInput = (inputVal) => {
    setCode(inputVal);
  };
  const handleSubmit = (e) => {
    try {
      const submissionResults = submitCode(code, tests, variableName);
      setResults(submissionResults);
    } catch (error) {
      alert(
        "there is a syntax error in your submission. please correct it and try again"
      );
    }
  };
  const editorDidMount = (e) => {
    // console.log("editor did mount e:", e);
  };
  const options = {
    wordWrap: "on",
    formatOnType: true,
    tabCompletion: "on",
  };
  return (
    <div style={{ height: "calc(100vh - 2rem)", display: "flex" }}>
      <SidePanel {...{ name, description, handleSubmit, results }} />
      <MonacoEditor
        width="70%"
        // height="800"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={handleEditorInput}
        editorDidMount={editorDidMount}
      />
    </div>
  );
};

const SidePanel = ({ name, description, handleSubmit, results }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <button onClick={handleSubmit}>submit</button>
      {results && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {results.map((r) => {
            return <Result result={r} />;
          })}
        </div>
      )}
    </div>
  );
};

const Result = ({ result }) => {
  const { passed, outputs, error } = result;
  return (
    <div
      style={{
        alignSelf: "stretch",
        backgroundColor: passed ? "green" : "red",
        margin: "1rem",
        padding: "1rem",
      }}
    >
      <p>{passed ? "passed" : `failed: ${error.message}`}</p>
      {outputs.length ? (
        <div
          style={{
            backgroundColor: "black",
          }}
        >
          <h6>outputs:</h6>
          {outputs.map((o) => (
            <div>{`${o.args}`}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
