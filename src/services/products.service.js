import productManager from "../dao/manager/products.manager.js";
import productsModel from "../dao/models/product.model.js";
import logger from "../utils/logger.js";

export const getProductsService = async (
    page = 1,
    limit = 10,
    sort = 1,
    query = ""
) => {
    try {

        if (typeof page !== 'number' || typeof limit !== 'number' || typeof sort !== 'number' || typeof query !== 'string') {
            throw new Error("Invalid input values");
        }

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

        // Realizar la consulta de la base de datos
        const products = await productsModel.paginate(filter, options)

        // devolver productos y paginacion 
        return products;
    } catch (err) {
        logger.error(`An error occurred when obtaining products.${err.stack}  `)
        throw err;
    }
}

export const createProductService = async (productData) => {
    try {
        // Validacion
        if(!productData || typeof productData !== 'object') {
            throw new Error("Invalid product data")
        }
        // Crear el producto utilizando productManager 
        const product = await productManager.createProduct(productData)
        // Devolver el producto creado
        return product
    } catch (err) {
        logger.error(`An error occurred while creating the product${err.stack}  `)
        throw err;
    }
}