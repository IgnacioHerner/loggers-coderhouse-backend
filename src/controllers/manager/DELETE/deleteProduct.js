import productManager from "../../../dao/manager/products.manager.js";
import logger from "../../../utils/logger.js";

export const deleteProduct = async(req, res) => {
    const {productId} = req.body;

    try {
        const product = await productManager.deleteProduct(productId);
        logger.info(`Product ${product.title} deleted`)
        res.redirect("/api/products")
    } catch (err) {
        logger.error("An error ocurred while deleting the product from database\n", err)
        res.status(500).json({err: "An error ocurred while deleting the product from the database"})
    }
}