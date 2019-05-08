import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import { register } from "../actions/userActions";
import { Dialog } from "./Login";
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

    if (response === "duplicate") {
      throw new SubmissionError({
        _error: "such email already exist"
      });
    }

    if (!response.isAuth) {
      throw new SubmissionError({
        _error: "something vent wrong"
      });
    } else {
      this.props.history.push("/user/cart");
    }
  };

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      pristine,
      error,
      submitSucceeded,
      submitFailed
    } = this.props;

    return (
      <Dialog>
        <h3>Create account</h3>
        <form onSubmit={handleSubmit(this.submit)}>
          <Field name="name" type="text" label="Name" component={TextInput} />
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
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={invalid || submitting || pristine}
            fullWidth
            classes={{
              root: this.props.classes.root,
              disabled: this.props.classes.disabled,
              label:
                invalid || submitting || pristine
                  ? this.props.classes.label
                  : ""
            }}
          >
            Create account
          </Button>
          {submitSucceeded && (
            <p style={{ color: "#fafafa", textAlign: "center" }}>success</p>
          )}
          {submitFailed && (
            <p style={{ color: "#ff4d4d", textAlign: "center" }}>{error}</p>
          )}
        </form>
      </Dialog>
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
  },
  label: {
    color: "rgba(255, 255, 255, 0.76)"
  }
};

const mapStateToProps = ({ user: { registerSuccess = null } }) => {
  return {
    success: registerSuccess
  };
};

export default connect(
  mapStateToProps,
  { register }
)(reduxForm({ form: "registerForm", validate })(withStyles(styles)(Register)));
