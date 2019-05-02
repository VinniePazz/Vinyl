import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import { Heading } from "../../Home/HomeCardBlock";

import UserLayout from "../UserLayout";
import TextInput from "../../../app/common/form/Textinput";
import SelectInput from "../../../app/common/form/SelectInput";
import TextArea from "../../../app/common/form/TextArea";
import FileUpload from "../../FileUpload";

import {
  getGenres,
  addProduct,
  clearProduct
} from "../../../actions/productActions";

const validate = values => {
  const errors = {};
	console.log(values)
  const requiredFields = ["author", "album", "genre", "price"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

const Container = styled.div`
  width: 50%;
	margin: 0 auto;
	
	@media (max-width: 740px) {
		width: 75%;
	}

	@media (max-width: 500px) {
		width: 100%;
	}
`;

class ProductForm extends Component {
  state = { images: [], uploading: false };

  async componentDidMount() {
    await this.props.getGenres();
  }

  submit = async values => {
    values.images = this.state.images;
    const response = await this.props.addProduct(values);

    if (!response.success) {
      throw new SubmissionError({
        _error: response.error.message
      });
    } else {
      this.props.clearProduct();
      this.props.reset();
      this.setState({
        images: []
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  removeImage = async id => {
    await axios.get(`/api/users/removeimage?public_id=${id}`);
    // maybe we should check if image has been deleted from the Cloudinary?

    let images = this.state.images.filter(item => {
      return item.public_id !== id;
    });

    this.setState({
      images
    });
  };

  onDrop = async files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    const response = await axios.post(
      "/api/users/uploadimage",
      formData,
      config
    );

    this.setState({
      uploading: false,
      images: [...this.state.images, response.data]
    });
  };

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      pristine,
      error,
      submitFailed,
      products,
      submitSucceeded
    } = this.props;

    return (
      <UserLayout>
        <Heading>Add vinyl</Heading>
        <form onSubmit={handleSubmit(this.submit)}>
          <Field
            name="images"
            type="file"
            handleDrop={images => this.onDrop(images)}
            handleRemove={this.removeImage}
            component={FileUpload}
            images={this.state.images}
            uploading={this.state.uploading}
          />
          <Container>
            <Field
              name="author"
              type="text"
              label="author"
              component={TextInput}
            />
            <Field
              name="album"
              type="text"
              label="album or song"
              component={TextInput}
            />
            <Field name="year" type="text" label="year" component={TextInput} />
            <Field
              name="genre"
              label="genre"
              options={products.genres || []}
              component={SelectInput}
            />
            <Field
              name="price"
              type="text"
              label="price"
              component={TextInput}
            />
            <Field
              name="description"
              label="description"
              placeholder="describe vinyl information here"
              rows={10}
              cols={10}
              component={TextArea}
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
              add vinyl
            </Button>
            {submitFailed && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
            {submitSucceeded && (
              <p style={{ color: "green", textAlign: "center" }}>SUCCESS</p>
            )}
          </Container>
        </form>
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
    addProduct,
    clearProduct
  }
)(
  reduxForm({ form: "productForm", validate })(withStyles(styles)(ProductForm))
);
