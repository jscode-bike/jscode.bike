import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { ArenaContext } from "../ArenaContext";

const LightWeightEditor = () => {
  const { /*editorTheme,*/ code, setCode } = useContext(ArenaContext);
  const textAreaRef = useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    setCode(e.target.value);
  };
  const setNewPosition = (start) => {
    /// had to do this to get tab button to behave properly...
    // am setting focus/cursor position at the end of event loop
    // seems to be the only way to overcome state change render ref change
    // need to do more reseach on how textareas behave
    // esp with respect to state changes
    // hopefully I figure out the right way to do this someday
    // but this is working just fine for now
    const positionSetter = () => {
      const tRef = textAreaRef.current;
      tRef.focus();
      tRef.selectionStart = textAreaRef.current.selectionEnd = start + 2;
    };
    setTimeout(positionSetter, 0);
  };
  const handleTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      const tRef = textAreaRef.current,
        start = tRef.selectionStart,
        end = tRef.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setNewPosition(start);
    }
  };
  return (
    <div>
      <TextArea
        value={code}
        ref={textAreaRef}
        onChange={handleChange}
        onKeyDown={handleTab}
        autoFocus
      />
    </div>
  );
};

const TextArea = styled.textarea`
  height: calc(
    var(--editor-height) - var(--spacing-small) - var(--spacing-medium)
  );
  width: 100%;
  color: white;
  padding: var(--spacing-small);
  border: none;
  background-color: var(--bg-color-dark);
  resize: none;
  outline: none;
  font-size: 1.2rem;
  font-family: monospace;
`;

export default LightWeightEditor;
