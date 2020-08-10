import React from "react";
import styled from "styled-components";

const Message = ({ message }) => {
  const { type, text } = message;

  return (
    <MessageContainer>
      {type === "error" ? (
        <ErrorText>{text}</ErrorText>
      ) : (
        <InfoText>{text}</InfoText>
      )}
    </MessageContainer>
  );
};

const ErrorText = styled.div`
  background-color: var(--color-red);
  padding: var(--spacing-medium);
  width: 100%;
`;

const InfoText = styled.h3``;

const MessageContainer = styled.div`
  display: flex;
  margin: var(--spacing-medium);
`;

export default Message;
