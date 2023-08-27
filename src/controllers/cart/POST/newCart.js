import { newCartService } from "../../../services/carts.service.js";
import logger from "../../../utils/logger.js";

export const newCart = async (req, res) => {
    logger.info("New cart created")
    try {
        const newCart = await newCartService()
        res.json({ newCart })
    } catch (err) {
        logger.error("An error ocurred while creating the cart \n", err)
        res.status(500).json({err: "An error ocurred while creating the cart"})
    }
}