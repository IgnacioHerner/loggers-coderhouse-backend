import cartModel from '../dao/models/cart.model.js'
import productModel from '../dao/models/product.model.js'
import ticketModel from '../dao/models/ticket.model.js'
import { CustomError } from './errors/custom_errors.js'
import EErros from './errors/enums.js'
import {
    addToCartErrorInfo,
    generateTicketErrorInfo,
    getCartsErrorInfo,
    postCartsErrorInfo,
    removeFromCartInfo,
    updateCartQtyErrorInfo
} from './errors/info.js'

export const getCartsService = async () => {
    try {
        const carts = await cartModel.find().populate("products.productId").lean().exec();
        
        return carts;
    } catch (err) {
        CustomError({
            name: "Get Carts Error",
            cause: getCartsErrorInfo(carts),
            mesagge: "Error while getting the carts",
            code: EErros.ERROR_GET_CARTS
        })
    }
}

export const newCartService = async () => {
    try {
        const newCart = await cartModel.create({})
        return newCart;
    } catch (err) {
        CustomError({
            name: "New Cart Error",
            cause: postCartsErrorInfo(carts),
            mesagge: "Error while creating a new cart",
            code: EErros.ERROR_POST_CARTS,
        })
    }
}

export const addToCartService = async (productId) => {
    try {
        let cart = await cartModel.findOne()
        
        if (!cart) {
            cart = await cartModel.create({ products: []})
        }

        const existingProductIndex = cart.products.findIndex(
            (item) => item.productId && item.productId.toString() === productId
        )

        const product = await productModel.findById(productId)
        const stock = product.stock;

        if (existingProductIndex !== -1 ) {
            const existingProduct = cart.products[existingProductIndex]
            const totalQuantity = existingProduct.quantity + 1;

            if (totalQuantity > stock) {
                return stock
            }
            
            cart.products[existingProductIndex].quantity = totalQuantity
        } else {
            cart.products.push({ productId, quantity: 1})
        }
        
        await cart.save()
        return cart;
    } catch (err) {
        CustomError({
            name: "Add to cart Error",
            cause: addToCartErrorInfo(productId),
            mesagge: "Error while adding the product to the cart",
            code: EErros.ERROR_ADD_TO_CART
        })
    }
}

export const removeFromCartService = async (productId) => {
    try {
        const cart = await cartModel.findOne()

        if (!cart) {
            CustomError({
                name: "Cart doesn't exist",
                cause: getCartsErrorInfo(cart),
                message: "The cart doesn't exist",
                code: EErros.ERROR_GET_CARTS,
            })
        }

        cart.products = cart.products.filter(
            (item) => item.productId.toString() !== productId
        )

        await cart.save()
        return cart;
    } catch (err) {
        CustomError({
            name: "Remove from Cart Error",
            cause: removeFromCartInfo(productId),
            message: "Error while removing the product from the cart",
            code: EErros.ERROR_REMOVE_FROM_CART,
        })
    }
}

export const updateCartQtyService = async (cartId, productId, quantity) => {
    try {
        const cart = await cartModel.findById(cartId)

        if (!cart) {
            CustomError({
                name: "Cart doesn't exist",
                cause: getCartsErrorInfo(cart),
                message: "The cart doesn't exist",
                code: EErros.ERROR_GET_CARTS,
            })
        }

        const productIndex = cart.products.findIndex(
            (item) => item.productId.toString() === productId
        )

        if(productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
        } else {
            throw new Error("The product doesn't exist in the cart")
        }
        
        const product = await productModel.findById(productId)
        const stock = product.stock;

        if (quantity > stock || quantity <= 0) {
            return null
        }

        await cart.save();
        return cart;
    } catch (err) {
        CustomError({
            name: "Update Cart Quantity Error",
            cause: updateCartQtyErrorInfo(productId),
            massage: "Error while updtating the cart quantity",
            code: EErros.ERROR_UPDATE_CART_QTY,
        })
    }
}

export const generateTicketService = async (purchase, purchaserEmail) => {
    try {
        const total = purchase.products.reduce(
            (sum, product) => sum + product.productId.price * product.quantity, 0
        )

        const ticket = new ticketModel({
            amount: total,
            purchaser: purchaserEmail,
        })
        await ticket.save()

        for (const product of purchase.products) {
            await productModel.updateOne(
                {_id: product.productId._id},
                {$inc: {stock: -product.quantity}}
            )
        }

        await cartModel.deleteOne({_id: purchase._id})

        return ticket.toObjet();
    } catch (err) {
        CustomError({
            name: "Generate Ticket Error",
            cause: generateTicketErrorInfo(ticket),
            message: "Error while generating the ticket",
            code: EErros.ERROR_GENERATING_TICKET,
        })
    }
}