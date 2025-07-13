const {
  insertUser,
  findUserByEmailOrId,
  findUserByEmail,
} = require("../models/queryUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/***** Registro *****/

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

/***** LOGIN *****/

const loginUser = async (req, res) => {
  try {
    const { e_mail, password } = req.body;

    // Validaciones

    if (!e_mail || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son obligatorios." });
    }

    const user = await findUserByEmail(e_mail); 
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: "Password incorrecto." });
    }

    const { password: _, ...userWithoutPassword } = user; // Para excluir la contraseña del objeto de respuesta

    const token = jwt.sign(
      {
        id: user.id,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login exitoso.",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

/***** Profile *****/

const getProfile = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error al obtener perfil:", error.message);
    res.status(500).json({ error: "Error al obtener perfil." });
  }
};

module.exports = { registerUser, loginUser, getProfile };
