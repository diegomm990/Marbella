const { Router } = require("express");
const router = Router();
const {
    getAll,
    createProduct,
    deleteProduct,
    getById
} = require("../Controllers/Products")

router.get("/", getAll)
router.get("/:id", getById)
router.put("/createProduct", createProduct)
router.delete("/deleteProduct/:_id", deleteProduct)

module.exports = router;
