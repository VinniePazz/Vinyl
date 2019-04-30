import React from "react";
import Slider from "react-slick";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Image = styled.div`
  position: relative;
  background-size: cover;
  background-position: center left;
  height: ${window.innerHeight}px;
  background-image: ${({ image }) => `url(${image})`};

  @media (max-width: 600px) {
    background-position: ${({ type }) =>
      type === "main" ? "75% 50%" : "63% 50%"};
  }
`;

const Slogan = styled.div`
  position: absolute;
  top: 50%;
  left: 8%;

  & div {
    background: #82828287;
    color: #ffffff;
    padding: 0px 0.5em;
    text-transform: uppercase;
    display: table;
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
    top: 35%;

    & .top {
      font-size: 2.5rem;
    }

    & .bottom {
      font-size: 1.8rem;
    }
  }
`;

const HomeSlider = ({ classes }) => {
  const slides = [
    {
      img: "/images/featured/home-vinyl.jpg",
      lineOne: "best way",
      lineTwo: "to feel the sound",
      linkTitle: "view offers",
      linkTo: "/shop",
      type: "main"
    },
    {
      img: "/images/featured/home-vinyl-2.jpg",
      lineOne: "all music",
      lineTwo: "in our shop !",
      linkTitle: "get it",
      linkTo: "/shop",
      type: "secondary"
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const generateSlides = () =>
    slides
      ? slides.map((item, i) => (
          <div key={item.img}>
            <Image image={item.img} type={item.type}>
              <Slogan>
                <div className="top">{item.lineOne}</div>
                <div className="bottom">{item.lineTwo}</div>
                <Button
                  component={Link}
                  to={item.linkTo}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  {item.linkTitle}
                </Button>
              </Slogan>
            </Image>
          </div>
        ))
      : null;

  return (
    <div className="featured_container">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

const styles = theme => ({
  button: {
    marginTop: ".5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  }
});

export default withStyles(styles)(HomeSlider);
