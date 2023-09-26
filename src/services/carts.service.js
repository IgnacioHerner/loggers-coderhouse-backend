import Cart from '../dao/models/cart.model.js'
import cartModel from '../dao/models/cart.model.js'
import productModel from '../dao/models/product.model.js';
import ticketModel from '../dao/models/ticket.model.js'
import userModel from '../dao/models/user.model.js'
import logger from '../utils/logger.js'
import { CustomError } from './errors/custom_errors.js'
import EErros from './errors/enums.js'

export const getCartsService = async (userId) => {
    try {

        const user = await userModel.findById(userId).lean().exec()

        if(!user) {
            throw new CustomError({
                name: "UserNotFoundError",
                message: "User not found",
                code: EErros.ERROR_GET_CARTS
            })
        }

        const cart = await Cart.findById(user.cart)
            .populate("products.productId")
            .lean()
            .exec();

        if(!cart) {
            throw new CustomError({
                name: "CartNotFound",
                message: "Cart not found",
                code: EErros.ERROR_GET_CARTS
            })
        }
        return cart;
    } catch (err){
        logger.error(`An error ocurred when obtaining the carts ${err.stack}`)
    }
}

export const AddToCartService = async (productId, userId) => {
    try {
        const user = await userModel.findById(userId).populate("cart").exec();

        if (!user) {
            throw new Error ("User not found")
        }

        const cart = user.cart;

        if(!cart) {
            throw new CustomError({
                name: "UserNotFoundError",
                message: "User not found",
                code: EErros.ERROR_ADD_TO_CART,
            })
        }

        const existingProductIndex = cart.products.findIndex((item) => item.productId && item.productId.toString() === productId)
        
        const product = await productModel.findById(productId)
        const stock = product.stock

        if (existingProductIndex !== -1) {
            const existingProduct = cart.products[existingProductIndex]
            const totalQuantity = existingProduct.quantity + 1;

            if (totalQuantity > stock){
                throw new Error ("Not enough stock")
            }
            cart.products[existingProductIndex].quantity = totalQuantity;
        } else {
            cart.products.push({productId, quantity: 1})
        }

        await cart.save()
        return cart
    } catch (err){
        logger.error(`Error adding item to cart ${err.stack}`)
        throw err;
    }
}

// export const removeFromCartService = async (productId, userId) => {
//     try{
//         const user = await userModel.findById(userId).populate("cart").exec()

//         if (!user || !user.cart) {
//             throw new Error ("User or cart doesn't exist")
//         }

//         const cart = user.cart
        
//         cart.products = cart.products.filter((item) => item.productId.toString() !== productId )

//         await cart.save()
//         return cart
//     } catch (err) {
//         logger.error(`Error removing item from cart ${err.stack}`)
//     }
// }

export const removeFromCartService = async(productId, userId) => {
    try{
        // Validar las entradas
        if(!productId || !userId) {
            throw new Error("productId and userId are required")
        }
        // Consulto el usuario y su carrito
        const user = await userModel.findById(userId).populate("cart")

        if (!user || !user.cart) {
            throw new Error("User or cart doesn't exist")
        }

        // Filtrar el producto del carrito
        user.cart.products = user.cart.products.filter((item) => item.productId.toString() !== productId)

        // Guardar el carrito actualizado
        await user.cart.save()

        //Devolver el carrito actualizado
        return user.cart;
    } catch (err) {
        logger.error(`Error removing item from cart: ${err.stack}`)
        throw err;
    }
}

// export const updateCartQtyService = async (cartId, productId, quantity) => {
//     try {
//         const cart = await cartModel.findById(cartId)

//         if(!cart) {
//             throw new CustomError({
//                 name: "CartNotExist",
//                 message: "The cart doesn't exist",
//                 code: EErros.ERROR_GET_CARTS,
//             })
//         }

//         const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId)

//         if(productIndex !== -1) {
//             cart.products[productIndex].quantity = quantity
//         } else {
//             throw new Error("The product doesn't exist in the cart")
//         }

//         const product = await productModel.findById(productId)
//         const stock = product.stock

//         if(quantity > stock || quantity <= 0){
//             return null
//         }

//         await cart.save()
//         return cart
//     } catch (err) {
//         logger.error(`Error updating cart quantity ${err.stack}`)
//     }
// }

export const updateCartQtyService = async (cartId, productId, quantity) => {
    try {
        // Validar las entradas
        if(!cartId || !productId || quantity <= 0) {
            throw new CustomError({
                name: "InvalidInput",
                message: "Invalid input values",
                code: EErros.ERROR_INVALID_INPUT,
            })
        }

        const cart = await cartModel.findById(cartId)

        if(!cart) {
            throw new CustomError({
                name: "CartNotExist",
                message: "The cart doesn't exist",
                code: EErros.ERROR_GET_CARTS,
            })
        }
        //Encontrar indice

        const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId)

        if(productIndex !== -1) {
            // Actualizar la cantidad de productos
            cart.products[productIndex].quantity = quantity;
        } else {
            throw new CustomError({
                name: "ProductNotExist",
                message: "The product doesn't exist in the cart",
                code: EErros.ERROR_PRODUCT_NOT_FOUND,
            })
        }

        // Consulto el producto para verificar el stock
        const product = await productModel.findById(productId)

        if(!product || quantity > product.stock) {
            throw new CustomError({
                name: "InvalidQuantity",
                message: "Invalid quantity or product not found",
                code: EErros.ERROR_INVALID_QUANTITY,
            })
        }

        // Guardo el carrito act
        
        await cart.save();

        // Devuelvo el carrito act
        return cart;

    } catch (err) {
        logger.error(`Error updating cart quantity ${err.stack}`)
        throw err;
    }
}

// export const generateTicketService = async (purchase, purchaserEmail) => {
//     try {
//         const total = purchase.products.reduce((sum, product) => sum + product.productId.price * product.quantity, 0)

//         const ticket = new ticketModel({
//             amount: total,
//             purchaser: purchaserEmail
//         })
//         await ticket.save()

//         for (const product of purchase.products) {
//             await productModel.updateOne(
//                 {_id: product.productId._id},
//                 {$inc: {stock: -product.quantity}}
//             )
//         }

//         await cartModel.updateOne(
//             {_id: purchase._id},
//             {$set: {products: []}}
//         )

//         return ticket.toObject()
//     } catch (err) {
//         logger.error(`Error generating ticket ${err.stack}`)
//     }  
// }

export const generateTicketService = async (purchase, purchaserEmail) => {
    try {
        //Validar entradas
        if(!purchase || !purchase.products || purchase.products.length === 0 || !purchaserEmail) {
            throw new Error("Invalid input values")
        }

        //Calcular nuevo ticket de compra
        const total = purchase.products.reduce((sum, product) => sum + product.productId.price * product.quantity, 0)

        //Creat un nuevo ticket de compra
        const ticket = new ticketModel({
            amount: total,
            purchaser: purchaserEmail,
        })
        
        //Guardar el ticket de compra
        await ticket.save()

        //Actualzar los stocks de los productos comprados
        for(const product of purchase.products) {
            await productModel.updateOne(
                {_id: product.productId._id},
                {$inc: {stock: -product.quantity} }
            );
        }
            
        //Vaicar el carrito 
        await cartModel.updateOne(
            {_id: purchase._id},
            {$set : {products: []}}
        )

        return ticket.toObject()
    } catch (err) {
        logger.error(`Error generating ticket ${err.stack}`);
        throw err;
    }  
}
