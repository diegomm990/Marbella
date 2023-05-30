const { Router } = require("express");
const router = Router();
const {
  registerUser,
  authUser,
  updateUser,
  getUsers,
  getUserById,
} = require("../Controllers/Users");

router.get("/getUsers", getUsers);
router.get("/getUser", getUserById);
router.post("/", registerUser);
router.post("/loginUser", authUser);
router.post("/updateUser", updateUser);

module.exports = router;
