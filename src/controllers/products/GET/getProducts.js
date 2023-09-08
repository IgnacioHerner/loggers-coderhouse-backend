import { getProductsService } from '../../../services/products.service.js'
import logger from '../../../utils/logger.js'

export const getProducts = async (req, res) => {
    const user = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort === "desc" ? -1 : 1;
    const query = req.query.query || "";

    logger.http("GET /api/products")

    try {

        // Validar y limpiar los parámetros de consulta
        const validatedPage = Math.max(1, page);
        const validatedLimit = Math.max(1, limit);
        const validatedSort = sort === -1 ? -1 : 1;
        const validatedQuery = query;


        const products = await getProductsService(page, limit, sort, query)

        const prevPage = validatedPage > 1 ? validatedPage - 1 : null;
        const nextPage = validatedPage < products.totalPages ? validatedPage + 1 : null; 

        const data = {
            products,
            query: validatedQuery,
            limit: validatedLimit,
            sort: validatedSort,
            prevPage,
            nextPage,
            userEmail: user.email,
            userRole: user.role,
        };

        Object.assign(data, req.query);

        res.status(201).render("products", data);       
    } catch (err) {
        logger.error(`An error occurred while getting the products${err.stack}  `);
        res.status(500).json({ err: "An error occurred while getting the products" });
    }
}

