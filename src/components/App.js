import React from "react";
import { CodeArena } from "./CodeArena/CodeArena";
import "highlight.js/styles/vs2015.css";
import sample from "../problems/fizzBuzz";

function App() {
  return (
    <div style={{ margin: ".5rem" }}>
      <CodeArena {...sample} />
    </div>
  );
}

export default App;
