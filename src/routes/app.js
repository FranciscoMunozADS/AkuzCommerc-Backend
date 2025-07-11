const { Router } = require("express");
const { validateToken } = require("../middleware/middleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/controllerUser");

const {
  readProduct,
  createProduct,
  updateProduct,
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
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.get("/products/:id", readProductByID);
router.delete("/products/:id", dropProduct);

// Cart Routes
router.get("/cart", readProductCart);
router.post("/cart", addProductInCart);
router.delete("/cart/:sku", dropProductInCart);
router.post("/checkout", validateToken ,finishBuy);

// Order Routes
router.get("/orders", validateToken ,readOrders);
router.get("/ordersId", validateToken ,readOrdersById);

// Default Route => Por si se ingresa una ruta no correspondida
router.use(defaultUrl);

module.exports = {
  router,
};
