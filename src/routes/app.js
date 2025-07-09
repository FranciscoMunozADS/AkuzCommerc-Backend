const { Router } = require("express");
const {
  readProduct,
  createProduct,
  updateProduct,
  readProductByID,
  dropProduct,
  defaultUrl,
} = require("../controllers/controllerProduct");
const { registerUser, loginUser } = require("../controllers/controllerUser");

const router = Router();

// User Routes

router.post("/register", registerUser);
router.post("/login", loginUser);

// Product Routes
router.get("/products", readProduct);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.get("/products/:id", readProductByID);
router.delete("/products/:id", dropProduct);

// Default Route => Por si se ingresa una ruta no correspondida
router.use(defaultUrl);

module.exports = {
  router,
};
