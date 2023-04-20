let shopping_cart = [];
// cart N products
// product N cart
// cart [{idProduct, userId}]
// user 1 : 1 cart
const { products } = require("./products");

function stockCart(req, res) {
  // products update stock
  const { productId, increment } = req.body;
  console.log("::::::::::::")
  if (productId) {
    let index;
    const product = products.filter((e, i) => {
      if (e.id === productId && e.userId === userId) {
        index = i;
        return e;
      }
    });
    if (product.length !== 0) {
      if (!increment) {
        if (product[0].stock !== 0) {
          product[0].stock -= 1;
        } else {
          return res.send("stock null");
        }
      } else {
        product[0].stock += 1;
      }
    }
  }
}

function postCart(req, res) {
  try {
    const { productId, userId } = req.body;
    if (productId && userId) {
      const shop = {
        userId,
        productId,
      };
      shopping_cart.push(shop);
      return res.status(200).json(shop);
    } else {
      return res.status(404).json({ message: "not found products" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

function getAllCart(req, res) {
  try {
    if (shopping_cart.length > 0) {
      return res.status(200).json(shopping_cart);
    } else {
      return res.status(404).json({ message: "not found products" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
function deleteCart(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const newCart = shopping_cart.filter((e) => e.productId !== Number(id));
      shopping_cart = newCart;
      return res.status(200).json(shopping_cart);
    } else {
      return res.status(404).json({ message: "not found products" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
function deleteAllCartUserId(req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const newCart = shopping_cart.filter((e) => e.userId !== Number(id));
      shopping_cart = newCart;
      return res.status(200).json(shopping_cart);
    } else {
      return res.status(404).json({ message: "not found products" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

module.exports = {
  postCart,
  getAllCart,
  deleteAllCartUserId,
  deleteCart,
  stockCart,
};
