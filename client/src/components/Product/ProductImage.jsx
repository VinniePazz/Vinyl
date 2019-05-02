import React, { Component } from "react";
import LightBox from "../Lightbox";
import styled from "styled-components";

const Poster = styled.div`
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat;
  width: 100%;
  height: 30em;
  cursor: pointer;

  transform: translate3d(14px, -5%, 8em) rotate3d(20, 31, -5, 46deg);
  box-shadow: -10px 10px #e76f511f, -20px 20px #e76f5114, -30px 30px #e76f510d;

  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.38, 0.89),
    box-shadow 0.2s ease 0.1s;

  @media (min-width: 960px) {
    &:hover {
      transform: translate3d(0px, -0%, 0em) rotate3d(0, 0, -0, 0deg);
      box-shadow: none;
    }

    &:active {
      transform: translate3d(0px, 2%, 0em) rotate3d(0, 0, -0, 0deg);
      box-shadow: none;
    }
  }
`;

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightboxImages = [];

      this.props.detail.images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({
        lightboxImages
      });
    }
  }

  handleLightBox = pos => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: pos
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false
    });
  };

  showThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        />
      ) : null
    );

  renderCardImage = ({ images }) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return `/images/placeholder.png`;
    }
  };

  render() {
    const { detail } = this.props;
    return (
      <div className="product_image_container">
        <div>
          <Poster
            image={this.renderCardImage(detail)}
            onClick={() => this.handleLightBox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs(detail)}</div>
        {this.state.lightbox ? (
          <LightBox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            pos={this.state.imagePos}
            onclose={this.handleLightBoxClose}
          />
        ) : null}
      </div>
    );
  }
}

export default ProdImg;
