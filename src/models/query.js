const { pool } = require("../database/connection");

const getAllProducts = async () => {
  const query = "SELECT * FROM productos";

  const { rows: products } = await pool.query(query);

  return products;
};

const postNewProduct = async (payload) => {
  const {
    sku,
    descripcion,
    descripcionDetallada,
    precio_venta,
    stock_actual,
    url_fotografia,
    estatus,
    id_categoria,
  } = payload;

  const values = [
    sku,
    descripcion,
    descripcionDetallada,
    precio_venta,
    stock_actual,
    url_fotografia,
    estatus,
    id_categoria,
  ];

  const query =
    "INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)";

  await pool.query(query, values);
};

const putProduct = async (payload, id) => {
  const {
    sku,
    descripcion,
    descripcionDetallada,
    precio_venta,
    stock_actual,
    url_fotografia,
    estatus,
    id_categoria,
  } = payload;

  const values = [
    sku,
    descripcion,
    descripcionDetallada,
    precio_venta,
    stock_actual,
    url_fotografia,
    estatus,
    id_categoria,
    id,
  ];

  const query =
    "UPDATE productos SET sku = $1 ,descripcion = $2 ,descripcionDetallada = $3 ,precio_venta = $4 ,stock_actual = $5 ,url_fotografia = $6 ,estatus = $7 ,id_categoria = $8 WHERE id = $9";

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
  deleteProduct,
};
