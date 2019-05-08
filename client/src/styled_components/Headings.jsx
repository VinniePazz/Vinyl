import styled from "styled-components";

export const Heading = styled.h3`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  ${({ shadow }) => shadow && "text-shadow: 0px -1px 5px #e76f51a3"};

  &::after {
    content: "";
    position: absolute;
    top: 150%;
    left: 50%;
    width: 5rem;
    height: 5px;
    background-color: #e76f51;
    transform: translateX(-50%);
  }
`;
