const { Router } = require("express");
const router = Router();
const {
    getStock,
    createStock
} = require("../Controllers/Stock")

router.get("/", getStock)
router.put("/createStock", createStock)

module.exports = router;
