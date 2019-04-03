import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import { getBrands, getWoods } from "../actions/productActions";
import { price } from "../app/data/price";
import { frets } from "../app/data/frets";

import PageTop from "./PageTop";
import CollapseCheckbox from "./CollapseCheckbox";
import CollapseRadio from './CollapseRadio';

class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.getBrands();
    this.props.getWoods();
  }

  handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.setState(
      {
        filters: newFilters
      },
      () => console.log(this.state)
    );
  };

  render() {
    const { products } = this.props;

    return (
      <>
        <PageTop title="Browse Products" />
        <div className="container">
          <Grid container spacing={24}>
            <Grid item sm={4}>
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, "brand")}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, "frets")}
              />
              <CollapseCheckbox
                initState={false}
                title="Wood"
                list={products.woods}
                handleFilters={filters => this.handleFilters(filters, "wood")}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </Grid>
            <Grid item sm={8}>
              right
            </Grid>
          </Grid>
        </div>
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
  { getBrands, getWoods }
)(Shop);
