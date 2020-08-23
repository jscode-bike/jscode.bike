import React, { useEffect, useRef } from "react";
import { getCssVariableNumberValue, debounce } from "../../../utils/utils.js";
import Monaco from "../shared/Monaco.js";

const Editor = () => {
  const editorRef = useRef(null);
  useEffect(() => {
    const resizeFn = debounce(function () {
      const headerTabAndSubmitHeight = [
        "--header-height",
        "--tab-height",
        "--spacing-small",
        "--button-panel-height",
        "--spacing-medium",
      ].reduce((a, b) => a + getCssVariableNumberValue(b), 0);
      const height = window.innerHeight - headerTabAndSubmitHeight;
      editorRef.current.layout({
        height,
        width:
          ((window.innerWidth / 9) * 5 -
            getCssVariableNumberValue("--spacing-medium")) |
          0,
      });
    });
    window.addEventListener("resize", resizeFn);
    return () => window.removeEventListener("resize", resizeFn);
  }, [editorRef]);
  return <Monaco {...{ editorRef }} />;
};

export default Editor;
