import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addToCart } from "../../actions/userActions";

const Card = styled.div`
  padding: 1em;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.38, 0.89),
    box-shadow 0.2s ease 0.1s, background-color 0.2s ease-in;

  @media (min-width: 960px) {
    &:hover {
      background-color: #e76f510d;
      transform: translate3d(30px, -5%, 8em) rotate3d(20, 31, -5, 46deg);
      box-shadow: -10px 10px #e76f511f, -20px 20px #e76f5114,
        -30px 30px #e76f510d;
		}
		
    &:active {
      background-color: #e76f510d;
      transform: translate3d(30px, -5%, 8em) rotate3d(20, 31, -5, 50deg);
      box-shadow: -10px 10px #e76f511f, -20px 20px #e76f5114,
        -30px 30px #e76f510d;
    }
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
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
  }

  & p {
    color: #e76f51bd;
    font-size: 0.9rem;
    font-weight: bold;
  }

  ${Card}:hover & {
    h3 {
      color: #e76f51;
    }
    p {
      color: #e76f51;
    }
  }
`;

const HomeCard = ({ images, album, author, price, _id }) => {
  return (
    <Card as={Link} to={`/product_detail/${_id}`}>
      <CardImage
        src={images.length > 0 ? images[0].url : "/images/placeholder.jpg"}
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
