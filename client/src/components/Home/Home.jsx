import React, { Component } from "react";
import { connect } from "react-redux";


import HomeSlider from "./HomeSlider";
import HomeCardBlock from "./HomeCardBlock";

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
      <>
        <HomeSlider />
        <HomeCardBlock list={products.bySell} title="top sales" />
        <HomeCardBlock list={products.byArrival} title="New arrivals" />
      </>
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
