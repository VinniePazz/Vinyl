import React, { Component } from "react";
import LightBox from "../Lightbox";
import styled from "styled-components";

import Poster from "./Poster";

const ProductImageSide = styled.div`
  width: 50%;

  @media (max-width: 749px) {
    width: 60%;
  }

  @media (max-width: 600px) {
    width: 80%;
  }

  @media (max-width: 450px) {
    width: 100%;
  }
`;

const Thumbs = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

const Thumb = styled.div`
  height: 125px;
  width: 125px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 0.1s linear;

  &:hover {
    transform: scale(1.05);
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
        <Thumb image={item} key={item} onClick={() => this.handleLightBox(i)} />
      ) : null
    );

  render() {
    const { detail } = this.props;
    return (
      <ProductImageSide>
        <Poster
          image={
            detail.images.length > 0
              ? detail.images[0].url
              : `/images/placeholder.png`
          }
        />
        <Thumbs>{this.showThumbs(detail)}</Thumbs>
        {this.state.lightbox ? (
          <LightBox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            pos={this.state.imagePos}
            onclose={this.handleLightBoxClose}
          />
        ) : null}
      </ProductImageSide>
    );
  }
}

export default ProdImg;
