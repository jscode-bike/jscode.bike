import React, { useContext } from "react";
import { ArenaContext } from "../../ArenaContext";
import Message from "../Message.js";
import Spinner from "../../../shared/Spinner.js";
import Results from "./Results.js";

const ResultsPanel = () => {
  const { loading, results, message } = useContext(ArenaContext);
  if (loading) return <Spinner />;
  if (!results) return <Message {...{ message }} />;
  return <Results {...{ results }} />;
};

export default ResultsPanel;
