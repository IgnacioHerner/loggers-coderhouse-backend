// import { getCartsService } from "../../../services/carts.service.js";
// import ticketModel from "../../../dao/models/ticket.model.js";
// import cartModel from '../../../dao/models/ticket.model.js'
// import productsModel from "../../../dao/models/product.model.js";
// import logger from '../../../utils/logger.js'

// export const getPurchase = async (req, res) => {
//     try {
//         const purchases = await getCartsService(req.params.id)
//         const purchase = purchases[0]

//         if (!purchase) {
//             logger.warning("The purchase is empty")
//             return res.status(400).render("errors/purchaseErr", {
//                 message: "The purchase is empty"
//             })
//         } else {
//             const total = purchase.products.reduce(
//                 (sum, product) => sum + product.productId.price * product.quantity, 0
//             )

//             const ticket = new ticketModel({
//                 amount: total,
//                 purchaser: req.user.email
//             })
//             await ticket.save()

//             for (const product of purchase.products) {
//                 await productsModel.updateOne(
//                     {_id: product.productId._id},
//                     {$inc: {stock: -product.quantity}}
//                 )
//             }

//             await cartModel.deleteOne({_id: purchase._id})

//             res
//                 .status(200)
//                 .render("purchase", {purchase, ticket: ticket.toObject()})
//         }
//     } catch (err) {
//         logger.error("An error ocurred when obtaining the purchase \n", err)
//         res
//             .status(500)
//             .json({err: "An error ocurred when obtaining the purchase"})
//     }
// }

import logger from "../../../utils/logger.js";
import { getCartsService, generateTicketService } from "../../../services/carts.service.js";

export const getPurchase = async (req, res) => {
    try {
        const userId = req.user.id;
        const purchases = await getCartsService(userId)
        
        if(!purchases || purchases,length === 0){
            logger.error(`The purchase is empty ${err.stack}`)
            
            return res.status(404).render("errors/purchaseErr", {
                message: "The purchase is empty"
            })
        }
        const purchase = purchases[0];

        const ticket = await generateTicketService(purchase, req.user.email)
        res.status(200).render("purchase", {purchase, ticket})
    } catch (err) {
        logger.error(`An error ocurred when obtaining the purchase ${err.stack}`)
        res.status(500).json({err: "An error ocurred when obtaining the purchase"})
    }
}