import React, { Component } from "react";
import { connect } from 'react-redux';
import UserLayout from "./UserLayout";
import { Field, reduxForm, SubmissionError } from "redux-form";
import TextInput from "../../app/common/form/Textinput";

import { editProfile } from "../../actions/userActions";

const validate = values => {
	const errors = {};
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
	return errors;
};

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
        <h1>Profile</h1>
        <form onSubmit={handleSubmit(this.submit)}>
          <h2>Personal information</h2>
          <Field name="name" type="text" label="Name" component={TextInput} />
          <Field
            name="lastname"
            type="text"
            label="Lastname"
            component={TextInput}
          />
          <Field name="email" type="text" label="Email" component={TextInput} />
          <button type="submit" disabled={invalid || submitting || pristine}>
            Update personal info
          </button>
          {submitFailed && <p style={{ color: "red" }}>{error}</p>}
          {submitSucceeded && pristine && <p style={{ color: "green" }}>SUCCESS</p>}
        </form>
      </UserLayout>
    );
  }
}

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
)(reduxForm({ form: "editProfile", validate, enableReinitialize: true })(EditProfileInfo));
