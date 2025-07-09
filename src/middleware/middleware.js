require("dotenv").config();
const jwt = require('jsonwebtoken')

const logRoute = (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] Ruta accedida: ${req.method} ${req.path}`
  );

  next();
};

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error("Token Missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = {
    logRoute,
    validateToken
}