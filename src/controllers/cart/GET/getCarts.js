import logger from "../../../utils/logger.js";
import {getCartsService, generateTicketService} from '../../../services/carts.service.js'

export const getCarts = async (req, res) => {
    logger.http("GET api/carts")

    try {
        const userId = req.user._id;

        if (!userId) {
            throw new Error("Invalid user ID")
        }

        const cart = await getCartsService(userId)

        if (!cart) {
            return res.status(200).json({message: "The cart is empty"})
        }

        return res.render("carts", {cart: [cart]})
    } catch (err) {
        logger.error(`An error ocurred when obtaing the carts ${err.stack}`)

        res.status(500).json({err: "An error ocurred when obtaining the carts"})
    }
}

export const getPurchase = async (req, res) => {
    try {
        const purchases = await getCartsService(req.params.id);
        const purchase = purchases[0]

        if(!purchase) {
            logger.warning("The purchase is empty");
            return res.status(400).render("errors/purchaseErr", {
                message: "The purchase is empty"
            })
        } else {
            const ticket = await generateTicketService(purchase, req.user.email)

            logger.info("The purchase was obtained successfully")

            return res.status(200).render("purchase", {purchase, ticket})
        }
    } catch (err) {
        logger.error("An error ocurred when obtaining the purchase \n", err)
        return res
            .status(500)
            .json({err: "An error ocurred when obtaining the purchase"})
    }
}