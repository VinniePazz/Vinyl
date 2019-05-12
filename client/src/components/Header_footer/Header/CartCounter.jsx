import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";

const CartCounter = ({ children }) => {
  return <Counter active={children > 0 ? true : false}>{children}</Counter>;
};

export const Counter = styled.div`
  position: absolute;
  top: -5%;
  right: -25%;
  background: ${({ active }) => (active ? "#e76f51" : "transparent")};
  font-size: 0.8rem;
  border-radius: 100%;
  height: 1.4rem;
  width: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CartCounter;
