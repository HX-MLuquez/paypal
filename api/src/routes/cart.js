const express = require("express");
const router = express.Router();
const {
  postCart,
  getAllCart,
  deleteAllCartUserId,
  deleteCart,
  stockCart
} = require("../controllers/cart");

router.get("/all", getAllCart);
router.post("/", postCart);
router.put("/stock", stockCart);
router.delete("/:id", deleteCart);
router.delete("/all/:id", deleteAllCartUserId); // recibe id user

module.exports = router;
