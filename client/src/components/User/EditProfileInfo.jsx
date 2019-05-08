import React, { Component } from "react";
import { connect } from "react-redux";
import UserLayout from "./UserLayout";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm, SubmissionError } from "redux-form";
import TextInput from "../../app/common/form/Textinput";

import { editProfile } from "../../actions/userActions";

import { Heading } from "../../styled_components/Headings";
import Button from "@material-ui/core/Button";

const validate = values => {
  const errors = {};
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
`;

class EditProfileInfo extends Component {
  submit = async values => {
    const response = await this.props.editProfile(values);
    if (!response.success) {
      throw new SubmissionError({
        _error: response.error.message
      });
    }
  };

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      pristine,
      submitFailed,
      submitSucceeded,
      error
    } = this.props;
    return (
      <UserLayout>
        <Heading>edit profile</Heading>
        <Container>
          <form onSubmit={handleSubmit(this.submit)}>
            <Field name="name" type="text" label="Name" component={TextInput} />
            <Field
              name="email"
              type="text"
              label="Email"
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
              change profile
            </Button>
            {submitFailed && (
              <p style={{ color: "#ff4d4d", textAlign: "center" }}>{error}</p>
            )}
            {submitSucceeded && (
              <p style={{ color: "#fafafa", textAlign: "center" }}>
                Profile changed
              </p>
            )}
          </form>
        </Container>
      </UserLayout>
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

const mapStateToProps = ({ user: { userData } }) => {
  return {
    initialValues: {
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email
    }
  };
};

export default connect(
  mapStateToProps,
  { editProfile }
)(
  reduxForm({ form: "editProfile", validate, enableReinitialize: true })(
    withStyles(styles)(EditProfileInfo)
  )
);
