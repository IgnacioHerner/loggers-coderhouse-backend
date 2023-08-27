import { addToCartService } from "../../../services/carts.service.js";
import logger from '../../../utils/logger.js'

export const addToCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await addToCartService(productId)

        logger.info(`Product ${productId} added to cart`)
        
        res.redirect("/api/products")
    } catch (err) {
        logger.error("An error ocurred while adding the product to the cart \n", err)
        res
            .status(500)
            .json({err: "An error ocurred while adding the product to the cart"}) 
    }
} 