const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
		maxlength: 100,
		trim: true,
		lowercase: true
  }
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = { Genre };
