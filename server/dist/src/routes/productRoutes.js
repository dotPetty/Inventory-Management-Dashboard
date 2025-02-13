"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productControllers_1 = require("../controllers/productControllers");
const router = (0, express_1.Router)();
router.get("/products", productControllers_1.getProducts);
router.post("/products", productControllers_1.createProduct);
exports.default = router;
