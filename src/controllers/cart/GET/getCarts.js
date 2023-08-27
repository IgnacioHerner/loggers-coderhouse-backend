import logger from "../../../utils/logger.js";
import {getCartsService, generateTicketService} from '../../../services/carts.service.js'

export const getCarts = async (req, res) => {
    logger.http("GET api/carts")

    try {
        const carts = await getCartsService()
        res.render("carts", {carts})
    } catch (err) {
        logger.error("An error ocurred when obtaing the carts \n", err)
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

            res.status(200).render("purchase", {purchase, ticket})
        }
    } catch (err) {
        logger.error("An error ocurred when obtaining the purchase \n", err)
        res
            .status(500)
            .json({err: "An error ocurred when obtaining the purchase"})
    }
}