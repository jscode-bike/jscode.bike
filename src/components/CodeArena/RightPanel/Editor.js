import React, { useEffect, useRef, useContext } from "react";
import { getCssVariableNumberValue } from "../../../utils/utils.js";
import { ArenaContext } from "../ArenaContext.js";
import Monaco from "../shared/Monaco.js";

const Editor = () => {
  const editorRef = useRef(null);
  const { editorTheme, code, setCode } = useContext(ArenaContext);
  useEffect(() => {
    const resizeFn = function () {
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
    };
    window.addEventListener("resize", resizeFn);
    return () => window.removeEventListener("resize", resizeFn);
  }, [editorRef]);
  return (
    <Monaco
      {...{
        editorTheme,
        code,
        setCode,
        editorRef,
      }}
    />
  );
};

export default Editor;
