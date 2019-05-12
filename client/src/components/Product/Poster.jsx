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
  cursor: pointer;

  /* transition: box-shadow 0.3s ease; */

  /* &:hover {
    box-shadow: 0 0 20px 4px #d2684e38;
  } */

  /* transform: translate3d(14px, -5%, 8em) rotate3d(20, 31, -5, 46deg);
  box-shadow: -10px 10px #e76f511f, -20px 20px #e76f5114, -30px 30px #e76f510d;

  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.38, 0.89),
    box-shadow 0.2s ease 0.1s;

  @media (min-width: 960px) {
    &:hover {
      transform: translate3d(0px, -0%, 0em) rotate3d(0, 0, -0, 0deg);
      box-shadow: none;
    }


  }

  @media (max-width: 450px) {
    transform: translate3d(0px, -0%, 0em) rotate3d(0, 0, -0, 0deg);
    box-shadow: none;
  } */
`;

const calc = (coords, x, y) => [
  -(y - coords.clientHeight / 2) / 20,
  (x - coords.clientWidth / 2) / 20,
  1.05
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Poster = ({ image, handleLightBox }) => {
  let coords = React.createRef();
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
		color: "rgba(231, 111, 81, 0)",
		config: config.slow
  }));
  return (
    <StyledPoster
      ref={coords}
      onClick={handleLightBox}
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
