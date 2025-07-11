const {
  getProductCart,
  postAddCart,
  deleteProductCart,
  postOrder,
} = require("../models/queryCart");

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

const dropProductInCart = async (req, res) => {
  try {
    const { sku } = req.params;
    await deleteProductCart(sku);

    res.send("Producto eliminado del Carro");
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

const finishBuy = async (req, res) => {
  try {
    const payload = req.body;

    const result = await postOrder(payload);

    res.send("Compra realizada con éxito");
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

module.exports = {
  readProductCart,
  addProductInCart,
  dropProductInCart,
  finishBuy,
};
