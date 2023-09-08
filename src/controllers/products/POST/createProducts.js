import { createProductService } from "../../../services/products.service.js";
import logger from '../../../utils/logger.js'

export const createProduct = async (req, res) => {
    try {

        const productData = req.body;
        
        if (!productData || !productData.title || !productData.description || !productData.price || !productData.status || !productData.code || !productData.stock || !productData.category || !productData.thumbnail) {
            return res.status(400).json({ error: "Invalid product data" });
        }

        const product = await createProductService(productData)
        logger.info(`Product ${product.title} created`)

        res.redirect("/api/products")
    } catch (err) {
        logger.error(`An error occurred while creating the product.${err.stack}  `);
        res.status(500).json({ err: "An error occurred while creating the product" });
      }
}