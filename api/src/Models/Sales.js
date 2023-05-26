const { Schema, model, default: mongoose, Types } = require("mongoose");

const SalesSchema = new Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  address: {
    type: Object,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  delivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  paymentMethod: {
    type: String,
  },
});

const Sales = model("Sales", SalesSchema);
module.exports = Sales;
