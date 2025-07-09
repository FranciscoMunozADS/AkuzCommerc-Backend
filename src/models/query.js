const { pool } = require("../database/connection");

const getAllProducts = async () => {
  const query = "SELECT * FROM productos";

  const { rows: products } = await pool.query(query);

  return products;
};

const postNewProduct = async (payload) => {
  const { title, description, price, image, category, stock } = payload;

  const values = [title, description, price, image, category, stock];

  const query =
    "INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)";

  await pool.query(query, values);
};

const putProduct = async (payload, id) => {
  const { title, description, price, image, category, stock } = payload;

  const values = [title, description, price, image, category, stock, id];

  const query =
    "UPDATE productos SET title = $1, description = $2 , price = $3 , image = $4 , category = $5 , stock = $6 WHERE id = $7";

  const { rowCount } = await pool.query(query, values);

  if (!rowCount) {
    throw { code: 404, message: "No se encontró un producto con ese ID" };
  }
};

const getProductByID = async (id) => {
  const query = "SELECT * FROM productos WHERE id = $1";
  const values = [id];

  const {
    rows: [products],
  } = await pool.query(query, values);

  return products;
};

const deleteProduct = async (id) => {
  const query = "DELETE FROM productos WHERE id = $1";
  const values = [id];

  const { rowCount } = await pool.query(query, values);

  if (!rowCount)
    throw { code: 404, message: "No se encontró ningún usuario con este ID" };
};

module.exports = {
  getAllProducts,
  postNewProduct,
  putProduct,
  getProductByID,
  deleteProduct
};
