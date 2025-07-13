const { pool } = require("../database/connection");

const getProductCart = async () => {
  const query = `
    SELECT u.id ,cc.sku, p.descripcion, p.precio_venta, p.url_fotografia, cc.cantidad FROM carroCompra cc 
    INNER JOIN usuarios u 
    ON cc.id_usuario = u.id 
    INNER JOIN productos p 
    ON cc.sku = p.sku
    `;

  const { rows: cart } = await pool.query(query);

  return cart;
};

const postAddCart = async (payload) => {
  const { sku, cantidad, id_usuario, precioVenta, statusCarro, fecha, hora } =
    payload;

  const query =
    "INSERT INTO carroCompra VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)";
  const values = [
    sku,
    cantidad,
    id_usuario,
    precioVenta,
    statusCarro,
    fecha,
    hora,
  ];

  await pool.query(query, values);
};

const deleteProductCart = async (sku) => {
  const query = "DELETE FROM carroCompra WHERE sku = $1";
  const values = [sku];

  const { rowCount } = await pool.query(query, values);

  if (!rowCount)
    throw { code: 404, message: "No se encontró ningún producto con este SKU" };
};

const postOrder = async (payload, userId) => {
  const fecha = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  for (const product of payload.products) {
    const { product_id, quantity } = product;

    // 1. Obtener info del producto (SKU y precio actual)
    const result = await pool.query(
      `SELECT sku, precio_venta FROM productos WHERE id = $1`,
      [product_id]
    );

    if (result.rows.length === 0) {
      throw { code: 404, message: `Producto ID ${product_id} no encontrado` };
    }

    const { sku, precio_venta } = result.rows[0];

    // 2. Insertar en historial
    await pool.query(
      `INSERT INTO historicoVentasUsuario 
      (id_usuario, sku_producto, cantidad_vendida, precio_producto, fecha_compra)
      VALUES ($1, $2, $3, $4, $5)`,
      [userId, sku, quantity, precio_venta, fecha]
    );
  }

  return { message: "Compra finalizada" };
}

module.exports = {
  getProductCart,
  postAddCart,
  deleteProductCart,
  postOrder
};
