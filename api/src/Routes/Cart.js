const { Router } = require("express");
const router = Router();
const {
    getCarts,
    createCart,
    checkSale,
    getCartByUser,
    manageCart
} = require("../Controllers/Cart")

router.get("/", getCarts)
router.post("/createCart", createCart)
router.post('/checkSale/:id', checkSale)
router.get('/getCartByUser/:id', getCartByUser)
router.post('/manageCart', manageCart)

module.exports = router;
