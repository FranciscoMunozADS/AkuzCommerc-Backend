const { insertUser, findUserByEmailOrId } = require("../models/queryUser");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const {
      idUsuario,
      nombre_completo,
      telefono,
      e_mail,
      password,
      url_avatar,
    } = req.body;

    // Validaciones

    if (!idUsuario || !nombre_completo || !telefono || !e_mail || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    if (!e_mail.includes("@") || !e_mail.includes(".")) {
      return res.status(400).json({ error: "Formato de email inválido." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 carácteres." });
    }

    // Verificar si el usuario ya existe
    const exist = await findUserByEmailOrId(e_mail, idUsuario);
    if (exist) {
      return res.status(409).json({ error: "El usuario ya existe." }); // 409 implica conflicto
    }

    // Encriptar contraseña

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    const nuevoUsuario = await insertUser({
      idUsuario,
      nombre_completo,
      telefono,
      e_mail,
      password: hashedPassword,
      url_avatar,
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: nuevoUsuario,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = { registerUser };
