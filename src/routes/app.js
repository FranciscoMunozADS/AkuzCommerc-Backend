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
  readProductCart,
  addProductInCart,
  dropProductInCart,
  finishBuy,
} = require("../controllers/controllerCart");

const router = Router();

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
router.get("/checkout", finishBuy);

// Default Route => Por si se ingresa una ruta no correspondida
router.use(defaultUrl);

module.exports = {
  router,
};
