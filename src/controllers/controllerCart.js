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
    res.status(error.code || 201).send(error);
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
    const userId = req.user.id;

    const result = await postOrder(payload, userId);

    res.status(200).json({
      message: result.message,
      order_id: Date.now(), // opcional: generar id simulado de orden
    });
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).send({ error: error.message });
  }
};

module.exports = {
  readProductCart,
  addProductInCart,
  dropProductInCart,
  finishBuy,
};
