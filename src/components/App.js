import React, { useState } from "react";
import { CodeArena } from "./CodeArena/CodeArena";

import sample from '../problems/fizzBuzz'

function App() {
  return (
    <div style={{ margin: ".5rem" }}>
      <CodeArena {...sample} />
    </div>
  );
}

export default App;
