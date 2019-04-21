import React from "react";
import Slider from "react-slick";
import Button from "../Button";

const HomeSlider = props => {
  const slides = [
    {
      img: "/images/featured/home-vinyl.jpg",
      lineOne: "best way",
      lineTwo: "to feel the sound",
      linkTitle: "Shop now",
      linkTo: "/shop"
    },
    {
      img: "/images/featured/home-vinyl-2.jpg",
      lineOne: "all collection",
      lineTwo: "of music, in our stocks !",
      linkTitle: "View offers",
      linkTo: "/shop"
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
            <div
              className="featured_image"
              style={{
                background: `url(${item.img})`,
                height: `${window.innerHeight - 35}px`
              }}
            >
              <div className="featured_action">
                <div className="tag title">{item.lineOne}</div>
                <div className="tag low_title">{item.lineTwo}</div>
                  <Button
                    type="default"
                    title={item.linkTitle}
                    linkTo={item.linkTo}
                    addStyles={{
                      margin: "10px 0 0 0"
                    }}
                  />
              </div>
            </div>
          </div>
        ))
      : null;

  return (
    <div className="featured_container">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
