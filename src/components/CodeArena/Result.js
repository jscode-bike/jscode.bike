import React from "react";

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
          {outputs.map((o, idx) => (
            <div key={idx}>{`${o.args.join(" ")}`}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Result;
