import { Router } from "express";
import { productController } from "../controllers/products/product.controller.js";
import { productManager } from '../controllers/manager/product.manager.controller.js';
import { isAdmin } from '../utils/utils.js';
import logger from "../utils/logger.js";

const router = Router();

router.get("/", productController.getProducts);

router.get("/create", isAdmin, async(req, res) => {
    logger.http("GET /create")
    res.render("create")
})

router.post("/", productController.createProduct)

router.post("/delete-product", productManager.deleteProduct)

router.get("/mockingproducts", productController.getMocking)

export default router;

