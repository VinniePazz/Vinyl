import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ShopGallery from "./ShopGallery";
import PageTop from "./PageTop";

import { getGenres, getProductsToShop } from "../actions/productActions";

const ShopGalleryUtilTop = styled.main`
  @media (min-height: 799px) and (min-width: 1600px) {
    padding-top: 5rem;
  }
`;

class Shop extends Component {
  state = {
    limit: 8,
    skip: 0,
    filters: {
      genre: []
    }
  };

  componentDidMount() {
    const { skip, limit, filters } = this.state;

    this.props.getGenres();

    this.props.getProductsToShop(skip, limit, filters);
  }

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

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

  render() {
    const { products } = this.props;
    const { limit } = this.state;

    return (
      <ShopGalleryUtilTop>
        <PageTop genres={products.genres} handleFilters={this.handleFilters} />
        <ShopGallery
          limit={limit}
          size={products.toShopSize}
          products={products.toShop}
          loadMore={this.loadMoreCards}
        />
      </ShopGalleryUtilTop>
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
  { getGenres, getProductsToShop }
)(Shop);
