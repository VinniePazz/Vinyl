import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const ProductsBlock = styled.div``;

const Product = styled.div`
  display: flex;
  padding: 1em;
  transition: all 0.2s ease;
  border: 1px solid #d6d6d6;
  margin-bottom: 1em;

	& h4 {
		font-weight: 500;
	}
`;

const ProductImage = styled.div`
  min-width: 10em;
  height: 10em;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5em;
	font-weight: 500;

  div {
    text-align: center;
  }

  p:first-child {
    color: #e76f51;

  }
`;

const Quantity = styled.div`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
	font-weight: 500;

`;

const Price = styled.div`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;


`;

const Remove = styled.div`
  flex-basis: 10%;;
  display: flex;
  flex-direction: column;
	justify-content: flex-start;
`;

const UserProductBlock = ({ products, removeItem }) => {
  const renderCartImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/placeholder.png";
    }
  };

  const renderItems = () =>
    products.cartDetail
      ? products.cartDetail.map(product => (
          <Product key={product._id}>
            <ProductImage image={renderCartImage(product.images)} />

            <ProductInfo>
              <h4>Product info:</h4>
              <div>
                <p>{product.author}</p>
                <p>"{product.album}"</p>
              </div>
            </ProductInfo>
            <Quantity>
              <h4>Quantity</h4>
              <p>{product.quantity}</p>
            </Quantity>
            <Price>
              <h4>Price</h4>
              <p>$ {product.price}</p>
            </Price>
            <Remove>
              <Button
                component={Link}
                to={`/product_detail/${product._id}`}
                variant="contained"
                color="primary"
              >
                product
              </Button>
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeItem(product._id)}
              >
                Remove
                <DeleteIcon style={{ marginLeft: ".5em" }} />
              </Button>
            </Remove>
          </Product>
        ))
      : null;

  return <ProductsBlock>{renderItems()}</ProductsBlock>;
};

export default UserProductBlock;
