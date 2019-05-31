import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { getProductsToSearch } from "../../../actions/productActions";

const SearchBlock = styled.form`
  position: relative;
  margin: 0 1rem 0 auto;
`;

const SearchInput = styled.input`
  font-family: inherit;
  font-size: 16px;
  padding: 0.2rem 0.5rem 0.2rem 2.5rem;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: #fafafa;
  transition: width 0.2s ease, padding 0.2s ease;
  width: 120px;
  background-image: url("/images/magnifier.svg");
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 5px;
  -webkit-appearance: none;
  cursor: pointer;

  &:focus {
    background-color: #e76f512e;
    width: 250px;
    cursor: text;
  }

  @media (max-width: 450px) {
    width: 0;
    &:focus {
      width: 200px;
    }
  }

  @media (max-width: 350px) {
    &:focus {
      width: 150px;
    }
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 250px;
  max-height: 180px;
  overflow: auto;
  background: #4b3645;
  list-style: none;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #e76f512e;
  }

  ::-webkit-scrollbar-thumb {
    background: #e76f51c7;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #e76f51;
  }

  @media (max-width: 450px) {
    top: 140%;
    left: -50%;
    width: 300px;
  }

  @media (max-width: 350px) {
    top: 140%;
    left: -50%;
    width: 200px;
  }
`;

const VinylLink = styled.li`
  padding: 0.5em;
  display: flex;
  transition: 0.3s ease;

  img {
    display: block;
    height: 75px;
    width: 75px;
  }

  &:hover {
    background: #e76f512e;
  }
`;

const VinylInfo = styled.div`
  margin-left: 0.5em;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & * {
    margin-top: 0.5em;
    text-align: center;
  }
`;

class SearchBar extends Component {
  state = {
    value: "",
    open: false,
    suggestions: []
  };

  handleClickAway = () => {
    this.setState({
      open: false
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleBlur = () => {
    this.setState({
      value: ""
    });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });

    const suggestions = this.props.products.filter(vinyl => {
      const regex = new RegExp(e.target.value, "gi");
      return vinyl.author.match(regex) || vinyl.album.match(regex);
    });

    this.setState({ suggestions });
  };

  componentDidMount() {
    this.props.getProductsToSearch();
  }
  render() {
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <SearchBlock>
          <SearchInput
            type="text"
            value={this.state.value}
            onClick={this.handleOpen}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            placeholder="Search"
            ariaLabel="search vinyls"
            autocomplete="off"
          />
          {this.state.open ? (
            <Dropdown>
              {this.state.suggestions.map(vinyl => (
                <VinylLink as={Link} to="/">
                  <img
                    src={vinyl.images[0].url || "/images/placeholder.png"}
                    alt={vinyl.author}
                  />
                  <VinylInfo>
                    <h5>{vinyl.author}</h5>
                    <h6>{vinyl.album}</h6>
                  </VinylInfo>
                </VinylLink>
              ))}
            </Dropdown>
          ) : null}
        </SearchBlock>
      </ClickAwayListener>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.toSearch
  };
};

export default connect(
  mapStateToProps,
  {
    getProductsToSearch
  }
)(reduxForm({ form: "searchForm" })(SearchBar));
