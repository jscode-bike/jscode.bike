import React, { useState } from "react";

import "./App.css";

import chai from "chai";

const runTest = (fn) => {
  try {
    fn();
    return true;
  } catch {
    return false;
  }
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    var add;
    eval(inputValue);
    const passedTest = runTest(() => chai.expect(add(2, 2)).to.equal(4));
    console.log(inputValue, passedTest);
  };
  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={handleChange} />
      <input type="submit" value="submit" onClick={handleSubmit} />
    </div>
  );
}

export default App;
