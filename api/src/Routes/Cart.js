const { Router } = require("express");
const router = Router();
const {
    getCarts,
    createCart,
    checkSale,
    getCartByUser,
    manageCart,
    deleteFromCart,
    logIn,
    getCartById,
    replaceCart
} = require("../Controllers/Cart")

router.get("/", getCarts)
router.post("/createCart", createCart)
router.post('/checkSale/:id', checkSale)
router.get('/getCartByUser/:id', getCartByUser)
router.post('/manageCart', manageCart)
router.post('/deleteFromCart', deleteFromCart)
router.post('/logIn', logIn)
router.get('/getCartById/:id', getCartById)
router.post('/replaceCart', replaceCart)

module.exports = router;
