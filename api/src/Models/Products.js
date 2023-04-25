const { Schema, model, default: mongoose, Types } = require("mongoose");

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  stockM: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock"
  },
  stockL: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock"
  },
  stockXL: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock"
  },
  images: {
    type: Array,
  },
  category: {
    type: String,
    required: true,
  }
}
);

const Products = model("Products", ProductsSchema);
module.exports = Products;
