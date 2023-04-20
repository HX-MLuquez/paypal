const jsonData = require("../../utils/products.json");

let products=[]

function postAllProducts(req, res) {
  try {
    products = [...jsonData];
    if (products.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(404).json({ message: "not found products" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
function getAllProducts(req, res) {
    try {
      if (products.length > 0) {
        return res.status(200).json(products);
      } else {
        return res.status(404).json({ message: "not found products" });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
function getProductById(req, res) {}

module.exports = {
  postAllProducts,
  getProductById,
  getAllProducts,
  products
};
