const { pool } = require("../database/connection");

const getOrders = async () => {
  const query = "SELECT * FROM historicoVentasUsuario";

  const { rows: cart } = await pool.query(query);

  return cart;
};

const getOrdersById = async (id) => {
  const query = "SELECT * FROM historicoVentasUsuario WHERE id = $1";
  const values = [id];

  const {
    rows: [cart],
  } = await pool.query(query, values);

  return cart;
};

module.exports = {
  getOrders,
  getOrdersById,
};
