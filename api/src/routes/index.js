const express = require("express");
const router = express.Router();
const cart = require("./cart");
const users = require("./users");
const products = require("./products");

router.use("/cart", cart);
router.use("/user", users);
router.use("/product", products);

module.exports = router;
