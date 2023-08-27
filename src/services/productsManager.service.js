import productsModel from "../dao/models/product.model.js";

export const createProduct = async function createProduct(productData) {
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
        throw new Error("The product code already exists")
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
}

export const getProducts = async function getProducts() {
    const products = await productsModel.find()
    return products
}

export const updateProduct = async function updateProduct (productId, newData) {
    const product = await productsModel.findByIdAndUpdate(productId, newData, {
        new: true
    })
    return product
}

export const deleteProduct = async function deleteProduct(productId){
    const product = await productModel.findByIdAndDelete(productId)
    return product;
}