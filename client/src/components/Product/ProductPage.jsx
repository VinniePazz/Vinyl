import React, { Component } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";

import { connect } from "react-redux";
import { addToCart } from "../../actions/userActions";
import {
  getProductDetail,
  clearProductDetail
} from "../../actions/productActions";

const ProductPageContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1rem 3rem 1rem;
  display: flex;
  justify-content: center;

  @media (max-width: 699px) {
    flex-direction: column;
    align-items: center;
  }

  @media (min-height: 900px) {
    padding: 10rem 1rem 3rem 1rem;
  }
`;

class ProductPage extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;

    await this.props.getProductDetail(id);
    if (!this.props.products.prodDetail) {
      this.props.history.push("/");
    }
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.clearProductDetail();
  }

  addToCartHandler(id) {
    this.props.addToCart(id);
  }

  render() {
    return (
      <ProductPageContainer>
        {this.props.products.prodDetail ? (
          <>
            <ProductImage detail={this.props.products.prodDetail[0]} />
            <ProductInfo
              addToCart={id => this.addToCartHandler(id)}
              detail={this.props.products.prodDetail[0]}
              user={this.props.user}
            />
          </>
        ) : (
          null
        )}
      </ProductPageContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getProductDetail, clearProductDetail, addToCart }
)(ProductPage);
