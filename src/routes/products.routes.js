import { Router } from "express";
import { productController } from "../controllers/products/product.controller.js";
import { productManager } from '../controllers/manager/product.manager.controller.js';
import { isAdmin } from '../middleware/admin.middleware.js';
import logger from "../utils/logger.js";

const router = Router();

router.get("/:manager?", productController.getProducts);

router.get("/create", isAdmin, async(req, res) => {
    logger.http("GET /create")
    res.render("create")
})

router.get('/update-product/:productId', productManager.getProductsManager);


router.post('/update-products/:productId', productManager.updateProduct)

router.post("/", productController.createProduct)

router.post("/delete-product", productManager.deleteProduct)

router.get("/mockingproducts", productController.getMocking)

export default router;

