import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addToCart } from "../../actions/userActions";

const Card = styled.div`
  padding: 1em;
  transition: background-color 0.2s ease-in;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #c8f1ec;
  }

`;

const CardImage = styled.img`
  display: block;
  max-width: 100%;
  margin: 0 auto;
  height: 13rem;

  @media (max-width: 600px) {
    height: 11rem;
  }
`;

const CardContent = styled.div`
  margin-top: 1em;
  text-align: center;

  & * {
    padding: 0.2em 0;
  }

  & h3 {
    font-size: 1.4rem;
		font-weight: 400;
  }

  & p {
    color: #7b7b7b;
    font-size: .9rem;
		font-weight: bold;
  }
`;

const HomeCard = ({ images, album, author, price, _id, isAuth, addToCart }) => {
  return (
    <Card>
      <CardImage
        src={images.length > 0 ? images[0].url : "/images/placeholder.png"}
      />
      <CardContent>
        <h3>{album}</h3>
        <h4>{author}</h4>
        <p>{price} $</p>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.user.userData.isAuth
  };
};

export default connect(
  mapStateToProps,
  { addToCart }
)(HomeCard);
