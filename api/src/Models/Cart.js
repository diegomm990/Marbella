const { Schema, model, default: mongoose, Types } = require("mongoose");

const CartsSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    date: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    saleFinished: {
        type: Boolean,
        default: false
    }
}
);

const Carts = model("Cart", CartsSchema);
module.exports = Carts;
