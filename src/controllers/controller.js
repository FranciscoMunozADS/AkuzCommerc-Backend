const {
  getAllProducts,
  postNewProduct,
  putProduct,
} = require("../models/query");

const readProduct = async (req, res) => {
  try {
    const prod = await getAllProducts();

    res.send(prod);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    await postNewProduct(payload);
    res.send("Producto Creado");
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    await putProduct(payload, id);
    res.send("Producto Modificado");
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

module.exports = {
  readProduct,
  createProduct,
  updateProduct,
};
