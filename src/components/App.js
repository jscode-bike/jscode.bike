import React from "react";
import CodeArena from "./CodeArena/CodeArena";
import sample from "../problems/fishBus/";

function App() {
  return (
    <div>
      <CodeArena {...sample} />
    </div>
  );
}

export default App;
