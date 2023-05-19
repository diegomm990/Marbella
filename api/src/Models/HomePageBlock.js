const { Schema, model, default: mongoose, Types } = require("mongoose");

const HomeBlockSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
  },
  image: {
    type: Object,
  },
  link: {
    type: String,
  },
  linkText: {
    type: String,
  },
  number: {
    type: Number,
  },
});

const HomeBlock = model("HomeBlock", HomeBlockSchema);
module.exports = HomeBlock;
