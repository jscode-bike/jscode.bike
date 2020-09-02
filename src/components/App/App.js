import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../Header/Header.js";
import Spinner from "../shared/Spinner.js";
import NoMatch from "./NoMatch.js";
import LocalStorageProvider from "./LocalStorageContext.js";

const Home = lazy(() => import("../Home/Home.js"));
const ArenaWrapper = lazy(() => import("./ArenaWrapper.js"));

function App() {
  return (
    <LocalStorageProvider>
      <Router>
        <Header />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:variableName" component={ArenaWrapper} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Suspense>
      </Router>
    </LocalStorageProvider>
  );
}

export default App;
