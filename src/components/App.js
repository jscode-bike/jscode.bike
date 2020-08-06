import React, { useState } from "react";
import { CodeArena } from "./CodeArena/CodeArena";
import fizzBuzzMd, { react as Description } from "./fizzBuzz.md";

//sample schema for problem
/**
 *
 * {
 *  name: string,
 *  variableName: string, //name of the variable to extract from the code and use on tests.
 *  description: string, or possibly mardown
 *  starting_code: string,
 *  tests: array of (functions or assertions?) or maybe string? explore this one.
 *  sampleTests: string probably? //deferred for now
 *  solutions: array of strings //deferred for now
 * }
 */
const sample = {
  name: "FizzBuzz",
  variableName: "fizzBuzz",
  description:
    'Write a function `fizzBuzz` that accepts an integer `n` and returns "fizz" if `n` is divisible by 3 and "buzz" if `n` is divisible by 5 and "fizzBuzz" if `n` is divisible by 3 and 5',
  startingCode: "function fizzBuzz(n) {\n  // code here...\n}",
  tests: [
    [[3], "fizz"],
    [[5], "buzz"],
    [[7], 7],
    [[99], "fizz"],
    [[25], "buzz"],
    [[60], "fizzBuzz"],
  ],
};

function App() {
  console.log(fizzBuzzMd);
  return (
    <div style={{ margin: ".5rem" }}>
      <CodeArena {...sample} descriptionComponent={Description} />
    </div>
  );
}

export default App;
