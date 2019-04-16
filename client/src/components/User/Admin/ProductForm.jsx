import React, { Component } from "react";
import axios from "axios";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";

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

  const requiredFields = [
    "author",
    "album",
    "genre",
    "price",
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

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
			window.scrollTo({ top: 0, behavior: "smooth" })
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
        <h1>Add product</h1>
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
          <Field name="author" type="text" label="Author" component={TextInput} />
          <Field name="album" type="text" label="Album or song" component={TextInput} />
					<Field
            name="genre"
            label="Genres"
            options={products.genres || []}
            component={SelectInput}
          />
          <Field
            name="description"
            label="Description"
            placeholder="Describe vinyl's content"
            rows={10}
						cols={10}
            component={TextArea}
          />
          <Field name="price" type="text" label="Price" component={TextInput} />
					
          <button type="submit" disabled={invalid || submitting || pristine}>
            Submit
          </button>
          {submitFailed && <p style={{ color: "red" }}>{error}</p>}
          {submitSucceeded && <p style={{ color: "green" }}>SUCCESS</p>}
        </form>
      </UserLayout>
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
    addProduct,
    clearProduct
  }
)(reduxForm({ form: "productForm", validate })(ProductForm));
