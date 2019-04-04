import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import ShopGallery from "./ShopGallery";
import FilterBar from "./FilterBar";

import {
  getBrands,
  getWoods,
  getProductsToShop
} from "../actions/productActions";
import { price } from "../app/data/price";
import { frets } from "../app/data/frets";

import PageTop from "./PageTop";

import ShopBar from "./ShopBar";

class Shop extends Component {
  state = {
    grid: "table",
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
    const { skip, limit, filters } = this.state;
    window.scrollTo(0, 0);

    this.props.getBrands();
    this.props.getWoods();

    this.props.getProductsToShop(skip, limit, filters);
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

    this.showFilteredResults(newFilters);

    this.setState({ filters: newFilters });
  };

  showFilteredResults = async filters => {
    await this.props.getProductsToShop(0, this.state.limit, filters);
    this.setState({
      skip: 0
    });
  };

  loadMoreCards = async () => {
    let { skip, limit, filters } = this.state;
    skip = skip + limit;

    await this.props.getProductsToShop(
      skip,
      limit,
      filters,
      this.props.products.toShop
    );

    this.setState({
      skip
    });
  };

  handleGrid = type => {
    this.setState({ grid: type });
  };

  render() {
		const { products } = this.props;
		const { grid, limit } = this.state;

    return (
      <>
        <PageTop title="Browse Products" />
        <div className="container">
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <FilterBar
                products={products}
                handleFilters={this.handleFilters}
              />
            </Grid>
            <Grid item xs={8}>
              <ShopBar grid={grid} onClick={this.handleGrid} />
              <ShopGallery
                grid={grid}
                limit={limit}
                size={products.toShopSize}
                products={products.toShop}
                loadMore={this.loadMoreCards}
              />
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
  { getBrands, getWoods, getProductsToShop }
)(Shop);
