import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { toastr } from "react-redux-toastr";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
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

export const Dialog = styled.div`
  max-width: 20em;
  margin: 25vh auto 0 auto;

  h3 {
    font-size: 1.5em;
    text-align: center;
    margin-top: 4.5em;
    margin-bottom: 2rem;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 140%;
      left: 50%;
      width: 3rem;
      height: 5px;
      background-color: #e76f51;
      transform: translateX(-50%);
    }
  }
`;

const Divider = styled.p`
  padding: 1em 0;
  text-align: center;
  color: #fafafa;
`;

class Login extends Component {
  submit = async values => {
    const response = await this.props.login(values);

    if (!response) {
      throw new SubmissionError({
        _error: "Something goes wrong with server. Try again later"
      });
    } else if (!response.loginSuccess) {
      if (response.wrong === "email") {
        throw new SubmissionError({
          email: "Wrong email",
          _error: response.message
        });
      } else {
        throw new SubmissionError({
          password: "Wrong password",
          _error: response.message
        });
      }
    }

    if (response && response.loginSuccess) {
      this.props.history.goBack();
    }
  };

  render() {
    const { handleSubmit, invalid, submitting, pristine } = this.props;
    return (
      <Dialog>
        <h3>Login</h3>
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
            Login
          </Button>
          <Divider>or</Divider>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/register"
            fullWidth
          >
            create account
          </Button>
        </form>
      </Dialog>
    );
  }
}

const styles = {
  root: {
    marginTop: "2em"
  },
  disabled: {
    backgroundColor: "#e76f517a !important",
    color: "#ffffff !important"
  },
  label: {
    color: "rgba(255, 255, 255, 0.76)"
  }
};

export default connect(
  null,
  { login }
)(reduxForm({ form: "loginForm", validate })(withStyles(styles)(Login)));
