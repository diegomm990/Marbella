const { Router } = require("express");
const router = Router();
const PaymentService = require('../Services/Payment');
const PaymentController = require("../Controllers/Payment");
const PaymentInstance = new PaymentController(new PaymentService());

router.get('/payment', function(req,res, next) { 
    PaymentInstance.getPaymentLink(req,res);
})

module.exports = router;
