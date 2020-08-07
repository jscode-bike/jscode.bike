import React from "react";

const Result = ({ result: { description, unitTestResults } }) => {
  return (
    <div>
      <code>{description}</code>
      <div>
        {unitTestResults.map((u, idx) => {
          const { outputs, passed, error } = u;
          return (
            <div
              key={idx}
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
        })}
      </div>
    </div>
  );
};

export default Result;
