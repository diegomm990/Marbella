const { Router } = require("express");
const router = Router();
const {
    getStock,
    createStock,
    manageStock
} = require("../Controllers/Stock")

router.get("/", getStock)
router.put("/createStock", createStock)
router.post('/manageStock', manageStock)

module.exports = router;
