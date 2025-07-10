const { Router } = require("express");
const {
  readProduct,
  createProduct,
  updateProduct,
  readProductByID,
  dropProduct,
  defaultUrl,
} = require("../controllers/controllerProduct");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/controllerUser");
const { validateToken } = require("../middleware/middleware");

const router = Router();

// User Routes

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", validateToken, getProfile);

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
