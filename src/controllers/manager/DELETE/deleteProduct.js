import productManager from "../../../dao/manager/products.manager.js";
import logger from "../../../utils/logger.js";

export const deleteProduct = async(req, res) => {
    const {productId} = req.body;
    const user = req.user

    try {

        if(!productId){
            return res.status(400).json({error: "Invalid productId"})
        }
        const product = await productManager.deleteProduct(productId);

        if(!product) {
            return res.status(404).json({err: "Product not found"})
        }

        if(user.role === "admin" || product.owner === user.email) {

            await productManager.deleteProduct(productId)

            logger.info(`Product ${productId} deleted`);

            return res.redirect("/api/products")
        } else {
            logger.warning(`Permission denied to delete product. ${user.email} is not owner of the product (${productId})`)
            return res.status(403).render("error/owner-denied")
        }
    } catch (err) {
        logger.error(`An error occurred while deleting the product from the database. ${err.stack}`);
        return res.status(500).json({err: "An error ocurred while deleting the product from the database"})
    }
}