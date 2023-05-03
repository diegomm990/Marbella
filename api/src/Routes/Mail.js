const { Router } = require("express");
const router = Router();
const {
    confirmPurchase
} = require("../utils/sendEmail")

router.put('/confirmPurchase', confirmPurchase)

module.exports = router;
