const {
  getAllProducts,
  postNewProduct,
  putProduct,
  getProductByID,
  deleteProduct,
} = require("../models/queryProduct");

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
    res.status(error.code || 404).send(error);
  }
};

const readProductByID = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getProductByID(id);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(error.code || 404);
  }
};

const dropProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);

    res.send("Producto Eliminado");
  } catch (error) {
    console.log(error);
    res.status(error.code || 404).send(error);
  }
};

const defaultUrl = (req, res) => {
  return res.status(404).send({ message: `${req.originalUrl} : No encontrada` });
};

module.exports = {
  readProduct,
  createProduct,
  updateProduct,
  readProductByID,
  dropProduct,
  defaultUrl
};
