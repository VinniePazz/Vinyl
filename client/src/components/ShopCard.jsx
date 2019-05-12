import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

import { addToCart } from "../actions/userActions";

const ShopCard = ({
  author,
  album,
  images,
  _id,
  price,
  genre,
  user,
  addToCart,
  loading
}) => {
  const width = document.documentElement.clientWidth + 10; // 10 = width of scroll stroke on the right

  return (
    <CollCard
      as={width < 960 ? Link : null}
      to={width < 960 ? `/product_detail/${_id}` : null}
    >
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
            !loading ? (
              <Tooltip title="add to cart" placement="top">
                <IconButton
                  color="secondary"
                  aria-label="Add to shopping cart"
                  onClick={() => addToCart(_id)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <CircularProgress
                color="secondary"
                size={40}
                thickness={4}
              />
            )
          ) : (
            <IconButton
              color="secondary"
              aria-label="Add to shopping cart if you logged in"
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

// ============================= STYLED COMPONENTS ===========================

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
	opacity: 0;
  background-color: #2b2028f2;
  transform: translateX(-110%);
  transition: transform 0.3s ease, opacity 0.5s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 960px) {
    ${CollCard}:hover & {
      transform: translateX(0);
			opacity: 1;
    }
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
    color: #fafafa78;
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

// ============================================================================

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading
  };
};

export default connect(
  mapStateToProps,
  { addToCart }
)(ShopCard);
