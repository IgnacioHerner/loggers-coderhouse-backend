import { createProductService } from "../../../services/products.service.js";
import logger from '../../../utils/logger.js'

export const createProduct = async (req, res) => {
    try {
        const product = await createProductService(req.body)
        logger.info(`Product ${product.title} created`)
        res.redirect("/api/products")
    } catch (err) {
        logger.error(`An error occurred while creating the product.${err.stack}  `);
        res
          .status(500)
          .json({ err: "An error occurred while creating the product" });
      }
}