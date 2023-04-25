const { Router } = require("express");
const router = Router();
const {
    getAllSales,
    createSale,
    approveSale,
    getSaleById
} = require("../Controllers/Sales")

router.get("/", getAllSales)
router.post("/createSale", createSale)
router.post('/approveSale/:id', approveSale)
router.get('/getById/:id', getSaleById)

module.exports = router;
