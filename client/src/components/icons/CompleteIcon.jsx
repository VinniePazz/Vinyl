import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
  width: 150px;
  height: 150px;

  &:hover {
    fill: ${({ hover }) => (hover ? "#e76f51" : null)};
  }
`;

const GenreIcon = ({ ...props }) => {
  return (
    <SVG
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 288.579 288.579"
      {...props}
    >
      <path
        d="M283.127,57.184l-22.871-22.131c-7.101-6.874-18.438-6.683-25.311,0.424L113.442,161.085 c-6.88,7.107-19.404,8.879-27.985,3.962l-42.824-24.542c-8.568-4.917-19.512-1.951-24.428,6.629l-15.83,27.615 c-4.917,8.58-1.951,19.518,6.623,24.434c0,0,103.889,59.46,103.931,59.376c0.048-0.084,137.25-141.57,170.617-176.058 C290.419,75.389,290.228,64.052,283.127,57.184z"
        fill="#e76f51"
      />
    </SVG>
  );
};

export default GenreIcon;
