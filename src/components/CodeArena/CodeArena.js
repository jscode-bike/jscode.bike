import React, { Suspense, useContext, lazy } from "react";
import { ArenaContext } from "./ArenaContext.js";
import Spinner from "../shared/Spinner.js";

const MobileView = lazy(() => import("./views/MobileView.js"));
const DesktopView = lazy(() => import("./views/DesktopView.js"));

const CodeArena = () => {
  const { isSmallScreen } = useContext(ArenaContext);
  return (
    <Suspense fallback={<Spinner />}>
      {isSmallScreen ? <MobileView /> : <DesktopView />}
    </Suspense>
  );
};

export default CodeArena;
