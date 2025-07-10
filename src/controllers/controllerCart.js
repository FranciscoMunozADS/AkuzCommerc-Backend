const { postAddCart, deleteProductCart } = require("../models/queryCart");
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

const dropProductInCart = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductCart(id);

    res.send("Producto eliminado del Carro");
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

const finishBuy = async (req, res) => {
  try {
    //TODO: Aterrizar bien este metodo
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
