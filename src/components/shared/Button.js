import styled from "styled-components";

const Button = styled.button`
  color: inherit;
  border: none;
  font-weight: bolder;
  cursor: pointer;
  outline: none;
  transition: filter 0.1s;

  :hover {
    filter: brightness(120%);
  }

  :active {
    filter: brightness(85%);
  }

  :disabled {
    opacity: 50%;
    pointer-events: none;
  }
`;

export default Button;
