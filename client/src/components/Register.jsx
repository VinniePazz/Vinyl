import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";

import { register } from "../actions/userActions";
import TextInput from "../app/common/form/Textinput";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Not the same";
  } else if (!values.confirmPassword) {
		errors.confirmPassword = "Required";
	}

  return errors;
};

class Register extends Component {

  submit = async values => {
  	const response = await this.props.register(values);
		console.log(response)
		if (!response.success) {
			throw new SubmissionError({
				_error: response.err.message
			});
		}
  };

  render() {
    const { handleSubmit, invalid, submitting, pristine, error } = this.props;

    return (
      <div style={{ width: "500px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit(this.submit)}>
          <Field name="name" type="text" label="Name" component={TextInput} />
          <Field
            name="lastname"
            type="text"
            label="Lastname"
            component={TextInput}
          />
          <Field
            name="email"
            type="email"
            label="Email"
            component={TextInput}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            component={TextInput}
          />
          <Field
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            component={TextInput}
          />
					{error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={invalid || submitting || pristine}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { register }
)(reduxForm({ form: "registerForm", validate })(Register));
