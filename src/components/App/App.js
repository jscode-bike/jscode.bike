import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header.js";
import Spinner from "../shared/Spinner.js";
import NoMatch from "./NoMatch.js";
import LocalStorageProvider from "./LocalStorageContext.js";

const Home = lazy(() => import("../Home/Home.js"));
const ArenaWrapper = lazy(() => import("./ArenaWrapper.js"));

function App() {
  return (
    <LocalStorageProvider>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path=":variableName" element={<ArenaWrapper />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </LocalStorageProvider>
  );
}

export default App;
