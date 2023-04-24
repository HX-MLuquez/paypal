const express = require("express");
const router = express.Router();
const {
  postCart,
  getAllCart,
  buyProducts,
  deleteCart,
  amountStockCart
} = require("../controllers/cart");

router.get("/all", getAllCart);
router.post("/", postCart);
router.put("/stock", amountStockCart);
router.delete("/:id", deleteCart);
router.post("/buy", buyProducts); // recibe { userId, productsId, total } y crea order y limpia carrito

module.exports = router;
