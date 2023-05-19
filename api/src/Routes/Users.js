const { Router } = require("express");
const router = Router();
const {
    registerUser,
    authUser,
    updateUser,
    getUsers
} = require("../Controllers/Users")

router.get('/getUsers', getUsers)
router.post('/', registerUser)
router.post('/loginUser', authUser)
router.post('/updateUser', updateUser)

module.exports = router;
