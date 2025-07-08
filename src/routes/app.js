const { Router } = require("express");
const { readProduct, createProduct } = require("../controllers/controller");

const router = Router()

router.get("/products", readProduct)
router.post("/products", createProduct)
// router.put("/products/:id", )

module.exports = {
    router
}