const { Router } = require("express");
const router = Router();
const {
  getHomeBlocks,
  createHomeBlocks,
} = require("../Controllers/HomePageBlock");

router.get("/", getHomeBlocks);
router.post("/createBlock", createHomeBlocks);

module.exports = router;
