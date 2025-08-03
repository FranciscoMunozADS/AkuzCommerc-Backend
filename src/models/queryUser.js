const { pool } = require("../database/connection");

/***** REGISTRO *****/

// Registrar un nuevo usuario
const insertUser = async (payload) => {
  const { idUsuario, nombre_completo, telefono, e_mail, password, url_avatar } =
    payload;

  const query = `
        INSERT INTO usuarios
        (idUsuario, nombre_completo, telefono, e_mail, password, url_avatar)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, idUsuario, nombre_completo, telefono, e_mail, url_avatar
    `;

  const values = [
    idUsuario,
    nombre_completo,
    telefono,
    e_mail,
    password,
    url_avatar,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Validación de si existe el usuario

const findUserByEmailOrId = async (e_mail, idUsuario) => {
  const query = `
    SELECT * FROM usuarios
    WHERE e_mail = $1 OR idUsuario = $2
  `;
  const values = [e_mail, idUsuario];
  const { rows } = await pool.query(query, values);
  return rows[0]; // retorna el primer usuario o undefined si no existe
};

/***** LOGIN *****/

const findUserByEmail = async (e_mail) => {
  const query = `SELECT * FROM usuarios WHERE e_mail = $1`;
  const { rows } = await pool.query(query, [e_mail]);
  return rows[0];
};

/* Update de Profile */

const getProfileInfo = async (id) => {
  const query = `SELECT * FROM usuarios WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

module.exports = { insertUser, findUserByEmailOrId, findUserByEmail, getProfileInfo };
