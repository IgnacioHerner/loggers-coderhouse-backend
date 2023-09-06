import { updateCartQtyService } from "../../../services/carts.service.js";
import logger from "../../../utils/logger.js";

export const updateCartQty = async (req, res) => {
    const {cartId, productId, quantity} = req.body

    try {
        const cart = await updateCartQtyService(cartId, productId, quantity)

        if (cart === null){
            logger.warning(`${productId} out of stock`)

            return res.render("error/stockError", {
                message: "There is not enough stock for this product or the value enteres is correct"
            })
        }

        res.redirect("/api/carts")
    } catch (err) {
        logger.error(`An error occurred while removing the product from the cart${err.stack}`)
        res.status(500).json({
            error: "An error ocurred while updating the product quantity"
        })
    }
}