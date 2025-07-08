const logRoute = (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] Ruta accedida: ${req.method} ${req.path}`
  );

  next();
};

module.exports = {
    logRoute
}