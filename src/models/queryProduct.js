const { pool } = require("../database/connection");

const getAllProducts = async () => {
  const query = `
  SELECT p.id, p.descripcion, p.descripcionDetallada, p.precio_venta, p.stock_actual, p.url_fotografia, cp.id as categoria, json_build_object('id', u.id, 'name', u.nombre_completo) as user 
  FROM productos p 
  INNER join categoriaProductos cp 
  ON p.id_categoria = cp.id 
  INNER join usuarios u 
  ON p.id_usuario = u.id
  `;

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
    id_usuario,
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
    id_usuario,
  ];

  const query =
    "INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)";

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
    id_usuario,
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
    id_usuario,
    id,
  ];

  const query = `
  UPDATE productos 
  SET sku = $1 ,descripcion = $2 ,descripcionDetallada = $3 ,precio_venta = $4 ,stock_actual = $5 ,url_fotografia = $6 ,estatus = $7 ,id_categoria = $8, id_usuario = $9 
  WHERE id = $10
  `;

  const { rowCount } = await pool.query(query, values);

  if (!rowCount) {
    throw { code: 404, message: "No se encontró un producto con ese ID" };
  }
};

const getProductCategory = async (categoria) => {
  const query = `
  SELECT p.id, p.descripcion, p.descripcionDetallada, p.precio_venta, p.stock_actual, p.url_fotografia, p.estatus, p.id_usuario, c.id as categoriaId, c.descripcion as descripcionCategoria
  FROM productos p 
  INNER JOIN categoriaProductos c 
  ON p.id_categoria = c.id 
  WHERE c.id = $1
  `;
  const values = [categoria];

  const { rows: products } = await pool.query(query, values);

  return products;
};

const getProductByID = async (id) => {
  const query = "SELECT * FROM productos WHERE id = $1";
  const values = [id];

  const { rows: products } = await pool.query(query, values);

  return products;
};

const deleteProduct = async (id) => {
  const query = "DELETE FROM productos WHERE id = $1";
  const values = [id];

  const { rowCount } = await pool.query(query, values);

  if (!rowCount)
    throw { code: 404, message: "No se encontró ningún producto con este ID" };
};

module.exports = {
  getAllProducts,
  postNewProduct,
  putProduct,
  getProductCategory,
  getProductByID,
  deleteProduct,
};
