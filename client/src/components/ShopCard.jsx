import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import { addToCart } from "../actions/userActions";

const CollCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CollImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

const CollContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 1em;
  background-color: #2b2028f2;
  transform: translateX(-110%);
  transition: transform 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${CollCard}:hover & {
    transform: translateX(0);
  }

  & * {
  }

  & h3 {
    font-size: 1.4rem;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 3em 0 0.8em 0;
  }

  & p {
    font-size: 1.2rem;
    font-weight: 400;
    top: 5%;
    position: absolute;
    color: #e76f51;
  }

  & p:first-of-type {
    right: 5%;
  }

  & p:last-of-type {
    left: 5%;
  }
`;

const Actions = styled.div`
  align-self: stretch;
  margin-top: auto;
  display: flex;
  justify-content: space-between;

  & a:first-of-type {
    align-self: center;
  }
`;

const ShopCard = ({ author, album, images, _id, price, genre, user }) => {
	const width = document.documentElement.clientWidth;

  return (
    <CollCard as={width < 960 && Link} to={`/product_detail/${_id}`}>
      <CollImage
        alt={`${author} / ${album}`}
        src={images.length > 0 ? images[0].url : "/images/placeholder.png"}
      />
      <CollContent>
        <h3>{album}</h3>
        <h4>{author}</h4>
        <p>{price} $</p>
        <p>{genre.name}</p>
        <Actions>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={`/product_detail/${_id}`}
          >
            view vinyl
          </Button>
          {user.userData && user.userData.isAuth ? (
            <IconButton
              color="secondary"
              aria-label="Add to shopping cart"
              onClick={addToCart()}
            >
              <AddShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              aria-label="Add to shopping cart"
              component={Link}
              to="/login"
            >
              <AddShoppingCartIcon />
            </IconButton>
          )}
        </Actions>
      </CollContent>
    </CollCard>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { addToCart }
)(ShopCard);
