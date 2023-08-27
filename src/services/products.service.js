import productManager from "../dao/manager/products.manager.js";
import productsModel from "../dao/models/product.model.js";

export const getProductsService = async (
    page = 1,
    limit = 10,
    sort = 1,
    query = ""
) => {
    try {
        const filter = query
            ? {
                $or: [
                    {title: {$regex: query, $options: "i"}},
                    {category: {$regex: query, $options: "i"}},
                ],
            }
            : {};
        
        const options = {
            page,
            limit,
            sort: {price: sort},
            lean: true,
        }

        const products = await productsModel.paginate(filter, options)
        return products;
    } catch (err) {
        throw new Error ("An error ocurred while getting the products")
    }
}

export const createProductService = async (productData) => {
    try {
        const product = await productManager.createProduct(productData)
        return product
    } catch (err) {
        throw new Error ("An error ocurred while creating the product")
    }
}