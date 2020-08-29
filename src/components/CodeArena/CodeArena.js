import React, { useContext, lazy } from "react";
import { ArenaContext } from "./ArenaContext.js";

const MobileView = lazy(() => import("./views/MobileView.js"));
const DesktopView = lazy(() => import("./views/DesktopView.js"));

const CodeArena = () => {
  const { isSmallScreen } = useContext(ArenaContext);
  return isSmallScreen ? <MobileView /> : <DesktopView />;
};

export default CodeArena;
