import productsModel from "../dao/models/product.model.js";
import logger from "../utils/logger.js";


export const createProduct = async function createProduct(productData) {
    try {
        
        //Validacion
        if(!productData || typeof productData !== 'object'){
            throw new Error("Invalid product data")
        }
        
        const {
            title,
            description,
            price,
            status,
            code,
            stock,
            category,
            thumbnail
        } = productData

        const codeExists = await productsModel.exists({ code })

        if (codeExists) {
            logger.error(`The product code already exists.${err.stack}  `);    
        }    
        const product = new productsModel({
            title,
            description,
            price,
            status,
            code,
            stock,
            category,
            thumbnail,
        })

        await product.save()

        return product

    } catch (err) {
        logger.error(`An error occurred while creating the product: ${err.stack}  `)
        throw err;
    }

}

export const getProducts = async function getProducts() {
    try {      
        const products = await productsModel.find()
        return products
    } catch (err) {
        logger.error(`An error occurred while fetching products: ${err.stack}  `)
        throw err;
    }
}

export const updateProduct = async function updateProduct (productId, newData) {
    try {

        if(!productId || typeof newData !== 'object'){
            throw new Error("Invalid input values")
        }

        const product = await productsModel.findByIdAndUpdate(productId, newData, {
            new: true
        })

        if(!product) {
            throw new Error("Product not found")
        }
        
        return product
        
    } catch (err) {
        logger.error(`An error occurred while updating the product: ${err.stack}  `)
        throw err;
    }
}

export const deleteProduct = async function deleteProduct(productId){
    try {
        if(!productId) {
            throw new Error("Invalid input value")
        }

        const product = await productModel.findByIdAndDelete(productId)

        if(!product) {
            throw new Error("Product not found")
        }
        
        return product;
    } catch (err) {
        logger.error(`An error occurred while deleting the product: ${err.stack}  `)
        throw err;
    }
}