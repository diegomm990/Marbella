const { Router } = require("express");
const router = Router();
const {
  confirmPurchase,
  contactForm,
  salePending,
} = require("../utils/sendEmail");

router.put("/confirmPurchase", confirmPurchase);
router.put("/contactForm", contactForm);
router.put("/salePending", salePending);

module.exports = router;
