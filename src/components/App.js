import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header/Header.js";
import Home from "./Home/Home.js";
import ArenaWrapper from "./App/ArenaWrapper.js";
import NoMatch from "./App/NoMatch.js";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:variableName" component={ArenaWrapper} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
