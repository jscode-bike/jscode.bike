import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import CodeArena from "./CodeArena/CodeArena.js";
import Header from "./Header/Header.js";
import Home from "./Home/Home.js";

import { obj as exerciseHash } from "../exercises/index";

const ArenaWrapper = () => {
  const { variableName } = useParams();
  const exercise = exerciseHash[variableName];
  return <CodeArena {...exercise} />;
};

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:variableName" component={ArenaWrapper} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
