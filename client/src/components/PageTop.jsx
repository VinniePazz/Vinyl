import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2em 1em;
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
`;

const Genre = styled.div`
  margin: 0.5em;
  padding: 0.5em 1em;
  border: 2px solid ${({ clicked }) => (clicked ? "#e76f51" : "#e76f518a")};
  color: ${({ clicked }) => (clicked ? "#ffffff" : "#ffffffc7")};
  ${({ clicked }) => clicked && "background-color: #e76f51"};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (min-width: 960px) {
    &:hover {
      border: 2px solid #e76f51;
    }
  }
`;

class PageTop extends Component {
  state = {
    checked: []
  };

  handleToggle = genre => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(genre);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(genre);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked
      },
      () => {
        this.props.handleFilters(newChecked, "genre");
      }
    );
  };

  renderGenres = () => {
    const { genres = [] } = this.props;
    return genres.map((genre, i) => (
      <Genre
        key={genre._id}
        onClick={this.handleToggle(genre._id)}
        clicked={this.state.checked.includes(genre._id) ? true : false}
      >
        {genre.name}
      </Genre>
    ));
  };

  render() {
    return <Container>{this.renderGenres()}</Container>;
  }
}

export default PageTop;
