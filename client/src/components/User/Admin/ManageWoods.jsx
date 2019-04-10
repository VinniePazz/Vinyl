import React, { PureComponent } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";

import TextInput from "../../../app/common/form/Textinput";

import { getWoods, addWood } from "../../../actions/productActions";

const validate = values => {
  const errors = {};
  if (!values.wood) {
    errors.name = "Required";
  }
  return errors;
};

class ManageWoods extends PureComponent {
  componentDidMount() {
    this.props.getWoods();
  }

  submit = async values => {
    let existingWoods = this.props.products.woods;

    const response = await this.props.addWood(values, existingWoods);

    if (!response.success) {
      throw new SubmissionError({
        _error: response.error.message
      });
    } else {
      this.props.reset();
    }
  };

  showCategoryItems = () =>
    this.props.products.woods
      ? this.props.products.woods.map(item => (
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
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit(this.submit)}>
              <Field
                name="name"
                type="text"
                label="Add new wood"
                component={TextInput}
              />
              <button
                type="submit"
                disabled={invalid || submitting || pristine}
              >
                Add wood
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
    getWoods,
    addWood
  }
)(reduxForm({ form: "addWood", validate })(ManageWoods));
