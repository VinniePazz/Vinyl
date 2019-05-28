import React from "react";

import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

const StyledPoster = styled(animated.div)`
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat;
  width: 100%;
  height: 30em;
`;

const calc = (coords, x, y) => [
  -(y - coords.clientHeight / 2) / 20,
  (x - coords.clientWidth / 2) / 20,
  1.05
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Poster = ({ image }) => {
  let coords = React.createRef();
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
		color: "rgba(231, 111, 81, 0)",
		config: config.slow
  }));
  return (
    <StyledPoster
      ref={coords}
      image={image}
      onMouseMove={({ clientX: x, clientY: y }) => {
        set({ xys: calc(coords.current, x, y) });
        set({ color: "rgba(231, 111, 81, 0.25)" });
      }}
      onMouseLeave={() => {
        set({ xys: [0, 0, 1] });
        set({ color: "rgba(231, 111, 81, 0)" });
      }}
      style={{ transform: props.xys.interpolate(trans), boxShadow: props.color.interpolate(color => `0 30px 60px -10px ${color}`) }}
    />
  );
};

export default Poster;
