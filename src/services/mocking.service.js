import mockingModel from "../dao/models/mocking.model.js";
import logger from '../utils/logger.js';


// export const getMockingService = async (
//     page = 1,
//     limit = 10,
//     sort = 1,
//     query = ""
// ) => {
//     try {
//         const filter = query
//             ? {
//                 $or: [
//                     {title: {$regex: query, $options: "i"}},
//                     {category: {$regex: query, $options: "i"}},
//                 ],
//             }
//             :{};
        
//         const options = {
//             page,
//             limit,
//             sort: {price: sort},
//             lean: true,
//         }

//         const mockingProduct = await MockingModel.paginate(filter, options);
//         return mockingProduct;
//     } catch (err) {
//         logger.error(`An error occurred when obtaining the mocking products.${err.stack}  `)
//     }
// }

export const getMockingService = async (
    page = 1,
    limit = 10,
    sort = 1,
    query = ""
) => {
    try {
        //Validar los parametros
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
            : {}

        const options = {
            page,
            limit,
            sort: {price: sort},
            lean: true
        }

        // Realizar consulta a la base de datos
        const mockingProducts = await mockingModel.paginate(filter, options)

        // Devolver productos y paginacion
        return mockingProducts
        
    } catch (err) {
        logger.error(`An error occurred when obtaining the mocking products.${err.stack}  `)
        throw err;
    }
}

