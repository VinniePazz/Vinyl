const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  user: {
    type: Array,
    default: []
  },
  metaData: {
    type: Array,
    default: []
  },
  buyingProduct: {
    type: Array,
    default: []
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
