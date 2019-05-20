import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
  fill: rgba(255, 255, 255, 0.3);
  width: ${({ width }) => width || "15px"};
  height: ${({ height }) => height || "15px"};
  transition: fill 0.2s;
  &:hover {
    fill: #e76f51b8;
  }
`;

const Facebook = props => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      id="Capa_1"
      viewBox="0 0 486.392 486.392"
      {...props}
    >
      <path d="M273.443,159.354l0.122-41.951c0-21.857,1.52-33.561,32.831-33.561h57.941V0h-83.021 c-80.559,0-99.102,41.617-99.102,109.985l0.091,49.369l-61.133,0.03v83.811h61.133v243.196h91.168l0.061-243.196l82.778-0.03 l8.907-83.811H273.443z" />
    </SVG>
  );
};

export default Facebook;
