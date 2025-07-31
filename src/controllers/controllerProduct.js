const {
  getAllProducts,
  postNewProduct,
  putProduct,
  getProductCategory,
  getProductByID,
  deleteProduct,
} = require("../models/queryProduct");
const { prepareHATEOAS } = require("./hateoas");

const readProduct = async (req, res) => {
  try {
    const prod = await getAllProducts();
    const HATEOAS = await prepareHATEOAS(prod);
    res.status(200).send(HATEOAS);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    await postNewProduct(payload);
    res.status(201).json({ message: "Producto Creado" });
  } catch (error) {
    console.log(error);
    res.status(error.code || 400).send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    await putProduct(payload, id);
    res.status(200).send("Producto Modificado");
  } catch (error) {
    console.log(error);
    res.status(error.code || 400).send(error);
  }
};

const readProductCategory = async (req, res) => {
  try {
    const { categoria } = req.params;

    const result = await getProductCategory(categoria);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(error.code || 404);
  }
};

const readProductByID = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getProductByID(id);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(error.code || 404);
  }
};

const dropProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);

    res.status(200).json({ message: "Producto Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(error.code || 404).send(error);
  }
};

const defaultUrl = (req, res) => {
  return res
    .status(404)
    .send({ message: `${req.originalUrl} : No encontrada` });
};

module.exports = {
  readProduct,
  createProduct,
  updateProduct,
  readProductCategory,
  readProductByID,
  dropProduct,
  defaultUrl,
};
