import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { login } from "../actions/userActions";

import TextInput from "../app/common/form/Textinput";

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

class Login extends Component {
	
  submit = async values => {
    const response = await this.props.login(values);

    if (!response) {
      throw new SubmissionError({
        _error: "Что-то не так с сервером. Попробуйте позже"
      });
    }

    if (!response.data.loginSuccess) {
      if (response.data.wrong === "email") {
        throw new SubmissionError({
					email: 'Wrong email',
          _error: response.data.message
        });
      } else {
				throw new SubmissionError({
					password: 'Wrong password',
          _error: response.data.message
        });
			}
    }

    if (response && response.data.loginSuccess) {
      this.props.history.push("/");
    }
  };

  render() {
    const { handleSubmit, invalid, submitting, pristine, error } = this.props;
    return (
      <div style={{ width: "500px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit(this.submit)}>
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
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
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
  { login }
)(reduxForm({ form: "loginForm", validate })(Login));
