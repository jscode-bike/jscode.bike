import React, { useContext } from "react";
import styled from "styled-components";

import Button from "../../shared/Button.js";
import { ArenaContext } from "../ArenaContext.js";

const EditorPanel = () => {
  const { monacoRef } = useContext(ArenaContext);

  const otherHandler = (e) => {
    // import("monaco-themes/themes/Monokai.json").then((data) => {
    //   monacoRef.current.editor.defineTheme("monokai", data);
    //   monacoRef.current.editor.setTheme("monokai");
    // });
    import("monaco-themes/themes/Cobalt.json").then((data) => {
      console.log(data);
      monacoRef.current.editor.defineTheme("cobalt", data);
      monacoRef.current.editor.setTheme("cobalt");
    });
  };
  return (
    <div>
      <OtherButton onClick={otherHandler}>O</OtherButton>
    </div>
  );
};

const OtherButton = styled(Button)`
  background-color: var(--color-blue);
  width: calc(var(--tab-height) * 1.618);
  padding: 0 var(--spacing-medium);
`;

export default EditorPanel;
