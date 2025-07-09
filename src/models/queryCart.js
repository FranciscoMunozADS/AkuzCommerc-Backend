const { pool } = require("../database/connection");

const getProductCart = async () => {
  const query = `
    SELECT cc.sku, p.descripcion, p.precio_venta, p.url_fotografia, cc.cantidad FROM carroCompra cc 
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

module.exports = {
  getProductCart,
  postAddCart,
};
