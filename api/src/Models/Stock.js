const { Schema, model, default: mongoose } = require("mongoose");

const StockSchema = new Schema({
    size: {
      type: String,
      required: true
    },
    quantity: {
        type: Number,
        default: 0,
    },
    name: {
        type: String
    }
    }
);

const Stock = model("Stock", StockSchema, 'stock');
module.exports = Stock;
