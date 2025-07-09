const { postAddCart } = require("../models/queryCart");
const { getProductCart } = require("../models/queryCart");

const readProductCart = async (req, res) => {
  try {
    const prod = await getProductCart();

    res.send(prod);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

const addProductInCart = async (req, res) => {
  try {
    const payload = req.body;
    await postAddCart(payload);
    res.send("Producto Agregado");
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

module.exports = {
  readProductCart,
  addProductInCart,
};
