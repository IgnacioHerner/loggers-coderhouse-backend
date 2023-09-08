import { removeFromCartService } from "../../../services/carts.service.js";
import logger from "../../../utils/logger.js";

export const removeFromCart = async (req, res) => {

    const { productId } = req.body
    const userId = req.user.id

    try {
        if(!productId){
            return res.status(400).json({error: "Invalid productId"})
        }
        const cart = await removeFromCartService(productId, userId)

        if(!cart) {
            logger.warning(`${productId} is not in the cart`)
            res.status(404).json({message: "Product not found in the cart"})
        }

        logger.info(`${productId} has been removed from the cart`)

        res.redirect("/api/products")
    } catch (err) {
        logger.error(`An error occurred while removing the product from the cart ${err.stack}`)
        res.status(500).json({err: "An error ocurred while removing the product from the cart"})
    }
}