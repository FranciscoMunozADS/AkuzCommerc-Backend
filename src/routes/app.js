const { Router } = require("express");
const { validateToken, checkAdmin } = require("../middleware/middleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/controllerUser");

const {
  readProduct,
  createProduct,
  updateProduct,
  readProductCategory,
  readProductByID,
  dropProduct,
  defaultUrl,
} = require("../controllers/controllerProduct");
const {
  readProductCart,
  addProductInCart,
  dropProductInCart,
  finishBuy,
} = require("../controllers/controllerCart");
const {
  readOrders,
  readOrdersById,
} = require("../controllers/controllerOrder");

const router = Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", validateToken, getProfile);

// Product Routes
router.get("/products", readProduct);
router.get("/products/:categoria", readProductCategory);
router.get("/products/:id", readProductByID);
// Product Admin Routes
router.post("/products", createProduct);
router.put("/products/:id", validateToken, checkAdmin, updateProduct);
router.delete("/products/:id", dropProduct);
//validateToken, checkAdmin,

// Cart Routes
router.get("/cart", validateToken, readProductCart);
router.post("/cart", validateToken, addProductInCart);
router.delete("/cart/:sku", validateToken, dropProductInCart);
router.get("/checkout", validateToken, finishBuy);

// Order Routes
router.get("/orders", readOrders);
// validateToken,
router.get("/orders/:id", readOrdersById);

// Default Route => Por si se ingresa una ruta no correspondida
router.use(defaultUrl);

module.exports = {
  router,
};
