import { getProducts } from "./GET/getProducts.js";
import { getMocking } from "./GET/getMocking.js";
import { createProduct } from "./POST/createProducts.js";

export const productController = {
    getProducts,
    createProduct,
    getMocking
}