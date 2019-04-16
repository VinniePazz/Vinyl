import React, { PureComponent } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";

import TextInput from "../../../app/common/form/Textinput";

import { getGenres, addGenre } from "../../../actions/productActions";

const validate = values => {
  const errors = {};
  if (!values.genre) {
    errors.name = "Required";
  }
  return errors;
};

class ManageGenres extends PureComponent {
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

  showCategoryItems = () =>
    this.props.products.genres
      ? this.props.products.genres.map(item => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

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
      <div className="admin_category_wrapper">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit(this.submit)}>
              <Field
                name="genre"
                type="text"
                label="Add new genre"
                component={TextInput}
              />
              <button
                type="submit"
                disabled={invalid || submitting || pristine}
              >
                Add brand
              </button>
              {submitFailed && <p style={{ color: "red" }}>{error}</p>}
              {submitSucceeded && <p style={{ color: "green" }}>SUCCESS</p>}
            </form>
          </div>
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
  {
    getGenres,
    addGenre
  }
)(reduxForm({ form: "addGenre", validate })(ManageGenres));
