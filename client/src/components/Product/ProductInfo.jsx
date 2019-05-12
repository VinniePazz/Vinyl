import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

const ProductInfoSide = styled.div`
  flex-grow: 1;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Album = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  text-transform: uppercase;
  font-weight: 700;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 150%;
    left: 50%;
    width: 3rem;
    height: 5px;
    background-color: #e76f51;
    transform: translateX(-50%);
  }
`;

const Author = styled.h3`
  margin-bottom: 1.5rem;
`;

const Year = styled.h3`
  font-size: 0.8rem;
  color: #fafafa78;
  margin-bottom: 1.5rem;
`;

const Genre = styled.p`
  font-size: 0.8rem;
  color: #fafafa78;
  margin-bottom: 3rem;

  @media (max-width: 450px) {
    margin-bottom: 1.5rem;
  }
`;

const Description = styled.p`
  max-width: 30em;
  text-align: center;
  font-size: 0.8rem;
  color: #fafafa78;
  margin-bottom: 3rem;

  @media (max-width: 699px) {
    max-width: 25em;
  }

  @media (max-width: 450px) {
    margin-bottom: 1.5rem;
    max-width: 100%;
  }
`;

const Price = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  font-weight: 500;

  @media (max-width: 450px) {
    margin-bottom: 1.5rem;
  }
`;

const ProductInfo = ({
  detail: { album, author, genre, price, year, _id, description },
  user,
	addToCart,
	loading
}) => {
  const renderInfo = () => (
    <ProductDetails>
      <Album>{album}</Album>
      <Author>{author}</Author>
      <Year>{year}</Year>
      <Genre>{genre.name}</Genre>
      <Description>{description}</Description>
      <Price>{price} $</Price>
      {user && user.userData.isAuth === true ? (
        !loading ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => addToCart(_id)}
          >
            add to cart
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => addToCart(_id)}
          >
            <CircularProgress color="primary" size={25} thickness={4} />
          </Button>
        )
      ) : (
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/login"
        >
          add to cart
        </Button>
      )}
    </ProductDetails>
  );

  return <ProductInfoSide>{renderInfo()}</ProductInfoSide>;
};

const mapStateToProps = state => {
  return {
    loading: state.loading
  };
};

export default connect(mapStateToProps)(withRouter(ProductInfo));
