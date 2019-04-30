import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import styled from "styled-components";
import Button from "@material-ui/core/Button";

import { Heading } from "../../Home/HomeCardBlock";

import TextInput from "../../../app/common/form/Textinput";

import { getGenres, addGenre } from "../../../actions/productActions";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};

const GenresBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
	justify-content: center;
	position: relative;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 1rem;
	border-radius: 1em;

	&::before {
		content: 'existing genres';
		position: absolute;
		bottom: 95%;
		left: 10%;
		padding: 0 1em;
		z-index: 999;
		background: #ffffff;
	}
`;

const Genre = styled.div`
  margin: 0.5em;
  padding: 0.5em 1em;
  border: 2px solid #e76f51;
  border-radius: 5px;
  color: #e76f51;
  font-weight: 500;
`;

const GenreForm = styled.form`
  width: 50%;
  margin: 0 auto;
`;

class ManageGenres extends Component {
  componentDidMount() {
    this.props.getGenres();
  }

  submit = async values => {
    let existingGenres = this.props.products.genres;

    const response = await this.props.addGenre(values, existingGenres);

    if (!response.success) {
      throw new SubmissionError({
        _error: response.error.message
      });
    } else {
      this.props.reset();
    }
  };

  showCategoryItems = () => {
    console.log();
    return this.props.products.genres
      ? this.props.products.genres.map(genre => (
          <Genre key={genre._id}>{genre.name}</Genre>
        ))
      : null;
  };

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      pristine,
      error,
      submitFailed,
      submitSucceeded
    } = this.props;

    return (
      <>
        <Heading>Add genre</Heading>
        <GenresBlock>{this.showCategoryItems()}</GenresBlock>
        <GenreForm onSubmit={handleSubmit(this.submit)}>
          <Field
            name="name"
            type="text"
            label="genre"
            component={TextInput}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={invalid || submitting || pristine}
            fullWidth
            classes={{
              root: this.props.classes.root,
              disabled: this.props.classes.disabled
            }}
          >
            add genre
          </Button>
          {submitFailed && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {submitSucceeded && (
            <p style={{ color: "green", textAlign: "center" }}>SUCCESS</p>
          )}
        </GenreForm>
      </>
    );
  }
}

const styles = {
  root: {
    marginTop: "2em",
    marginBottom: "1em"
  },
  disabled: {
    backgroundColor: "#e76f517a !important",
    color: "#ffffff !important"
  }
};

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  {
    getGenres,
    addGenre
  }
)(reduxForm({ form: "addGenre", validate })(withStyles(styles)(ManageGenres)));
