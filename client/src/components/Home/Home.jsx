import React, { Component } from "react";
import { connect } from "react-redux";

import HomeSlider from "./HomeSlider";
import HomePromotion from "./HomePromotion";
import CardBlock from "../CardBlock";

import {
  getProductsBySell,
  getProductsByArrival
} from "../../actions/productActions";

class Home extends Component {
  componentDidMount() {
    this.props.getProductsBySell();
    this.props.getProductsByArrival();
	}


  render() {
    const { products } = this.props;
    return (
      <div>
        <HomeSlider />
        <CardBlock list={products.bySell} title="Best Selling guitars" />
        <HomePromotion />
        <CardBlock list={products.byArrival} title="New arrivals" />
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
  { getProductsBySell, getProductsByArrival }
)(Home);
