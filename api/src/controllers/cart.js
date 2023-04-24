let shopping_cart = [];
let purchase_orders = [];
let orderId = 1;
// cart N products
// product N cart
// cart [{idProduct, userId}]
// user 1 : 1 cart
const { updateStockProducts, getStockProduct } = require("./products");

function amountStockCart(req, res) {
  try {
    const { userId, productId, increment } = req.body;
    // console.log("::::::::::::")
    let stock = getStockProduct(productId);
    console.log(":::stock:::", stock);
    if (productId && userId) {
      shopping_cart.map((e, i) => {
        if (e.productId === productId && e.userId === userId) {
          if (increment && e.amount < stock) {
            e.amount += 1;
            return res
              .status(200)
              .json({ message: `product id: ${productId} is increment` });
          } else if (!increment && e.amount > 0) {
            e.amount -= 1;
            return res
              .status(200)
              .json({ message: `product id: ${productId} is decrement` });
          }
        }
      });
      return res
        .status(404)
        .json({ message: `product not sealed or insufficient stock` });
    }
  } catch (error) {
    // res.status(404).json({ message: error });
  }
}

function postCart(req, res) {
  try {
    const { productId, userId, amount } = req.body;
    if (productId && userId) {
      const shop = {
        userId,
        productId,
        amount,
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
      return res.status(404).json({ message: "not found cart products" });
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

function buyProducts(req, res) {
  try {
    const { userId, productsId, total } = req.body;
    // productsId -> [{productId: 1, amount: 2, price_by_unit: 34}, {etc...}]
    if (userId && productsId && total) {
      const order = {
        id: orderId,
        userId,
        productsId,
        total,
      };
      orderId++;
      // crea la orden
      purchase_orders.push(order);

      // actualiza el stock de los productos
      for (let i = 0; i < productsId.length; i++) {
        updateStockProducts(productsId[i].productId, productsId[i].amount);
      }

      // limpia el carrito
      const newCart = shopping_cart.filter((e) => e.userId !== userId);
      shopping_cart = newCart;

      return res.status(200).json({ message: "created order", order });
    } else {
      res
        .status(404)
        .json({ message: "information is missing for the purchase detail" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

module.exports = {
  postCart,
  getAllCart,
  deleteCart,
  amountStockCart,
  buyProducts,
};

/*
Para el caso de amountStockCart no se puede usar try catch debido a que por una demora
se envía doble respuesta y no estamos trabajando cual promesa

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

Este error ocurre cuando intentas enviar encabezados de respuesta HTTP al cliente después de que 
ya se hayan enviado. En otras palabras, estás intentando modificar los encabezados de una respuesta 
que ya se ha enviado al cliente.

Para evitar este error, debes asegurarte de no enviar encabezados después de que 
se haya enviado la respuesta. 
*/
