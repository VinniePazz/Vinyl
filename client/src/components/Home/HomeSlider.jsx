import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Hero = styled.div`
  background-size: cover;
  background-position: center left;
  height: ${window.innerHeight}px;
  background-image: ${({ image }) =>
    `linear-gradient(to bottom, #4b36451a, #1a171954), url(${image})`};

  /* linear-gradient(to bottom,#4b364573,#2d1e29f2),url(/images/featured/home-vinyl-2.jpg) */

  @media (max-width: 600px) {
    background-position: 75% 50%;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  position: relative;
`;

const Slogan = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  bottom: 23%;
  left: 1.5rem;

  & div {
    background: #1d1c1c4d;
    color: #ffffff;
    padding: 0px 0.5em;
    text-transform: uppercase;
  }

  & .top {
    font-size: 3rem;
    font-weight: 700;
  }

  & .bottom {
    font-size: 2.5rem;
    font-weight: 300;
    margin-top: 0.5rem;
  }

  @media (max-width: 600px) {
    bottom: 25%;

    & div {
      background: #1d1c1cb8;
    }

    & .top {
      font-size: 3.5rem;
    }

    & .bottom {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 1600px) {
    bottom: 25%;

    & .top {
      font-size: 4.5rem;
    }

    & .bottom {
      font-size: 3.5rem;
    }
  }
`;

const HomeSlider = ({ classes }) => {
  const renderContent = () => (
    <Hero image={"/images/featured/home-vinyl.jpg"}>
      <Container>
        <Slogan>
          <div className="top">best way</div>
          <div className="bottom">to feel the sound</div>
          <Button
            component={Link}
            to={"/shop"}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            view offers
          </Button>
        </Slogan>
      </Container>
    </Hero>
  );

  return renderContent();
};

const styles = theme => ({
  button: {
    marginTop: ".5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.8rem"
    }
  }
});

export default withStyles(styles)(HomeSlider);
