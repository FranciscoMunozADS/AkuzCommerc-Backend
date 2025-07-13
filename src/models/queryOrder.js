const { pool } = require("../database/connection");

const getOrders = async () => {
  const query = "SELECT * FROM historicoVentasUsuario";

  const { rows: cart } = await pool.query(query);

  return cart;
};

const getOrdersById = async (userId) => {
  const query = "SELECT * FROM historicoVentasUsuario WHERE id_usuario = $1";
  const values = [userId];

  const { rows } = await pool.query(query, values);

  return rows;
};

module.exports = {
  getOrders,
  getOrdersById,
};
