const { Schema, model, default: mongoose, Types } = require("mongoose");

const SalesSchema = new Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  approved: {
    type: Boolean,
    required: true,
    default: false
  }
}
);

const Sales = model("Sales", SalesSchema);
module.exports = Sales;
