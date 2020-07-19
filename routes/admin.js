const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const shopController = require("../controllers/shop");

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:id", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

router.get("/products", adminController.getAdminProducts);

module.exports = router;
