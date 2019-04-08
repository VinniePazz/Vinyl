import React, { Component } from "react";
import PageTop from "../PageTop";

import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";

import { connect } from "react-redux";
import { addToCart } from "../../actions/userActions";
import {
  getProductDetail,
  clearProductDetail
} from "../../actions/productActions";

class ProductPage extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;

    await this.props.getProductDetail(id);
    if (!this.props.products.prodDetail) {
      this.props.history.push("/");
		}
		window.scrollTo(0, 0)
  }

  componentWillUnmount() {
    this.props.clearProductDetail();
  }

  addToCartHandler(id) {
    this.props.addToCart(id);
  }

  render() {
    return (
      <div>
        <PageTop title="Product detail" />
        <div className="container">
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProductImage detail={this.props.products.prodDetail[0]} />
                </div>
              </div>
              <div className="right">
                <ProductInfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={this.props.products.prodDetail[0]}
                />
              </div>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getProductDetail, clearProductDetail, addToCart }
)(ProductPage);
