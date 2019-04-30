const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    author: {
      required: true,
      type: String,
			maxlength: 100,
			trim: true
    },
    album: {
      type: String,
			maxlength: 100,
			trim: true,
			required: true,
    },
    year: {
      type: Number,
    },
    description: {
      type: String,
      maxlength: 100000
    },
    price: {
      required: true,
      type: Number,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true
    },
    quantity: {
			default: 0,
      type: Number
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
