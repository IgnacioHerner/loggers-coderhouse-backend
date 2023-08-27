import { removeFromCartService } from "../../../services/carts.service.js";
import logger from "../../../utils/logger.js";

export const removeFromCart = async (req, res) => {
    const { productId } = req.body

    try {
        const cart = await removeFromCartService(productId)

        logger.info(`${productId} has been removed from the cart`)

        res.redirect("/api/products")
    } catch (err) {
        logger.error("An error ocurred while removing the product from the cart \n", err)
        res
            .status(500)
            .json({err: "An error ocurred while removing the product from the cart"})
    }
}