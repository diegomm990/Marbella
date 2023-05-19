const { Router } = require("express");
const Products = require("./Products");
const Stock = require("./Stock");
const Users = require("./Users");
const Sales = require("./Sales");
const Carts = require("./Cart");
const Mail = require("./Mail");
const HomeBlock = require("./HomeBlock");
const PaymentService = require("../Services/Payment");
const PaymentController = require("../Controllers/Payment");
const PaymentInstance = new PaymentController(new PaymentService());

const router = Router();

router.post("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});
router.use("/products", Products);
router.use("/stock", Stock);
router.use("/users", Users);
router.use("/sales", Sales);
router.use("/cart", Carts);
router.use("/mail", Mail);
router.use("/homeBlock", HomeBlock);

module.exports = router;
