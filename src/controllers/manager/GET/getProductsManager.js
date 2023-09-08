import productsModel from "../../../dao/models/product.model.js";

export const getProductsManager = async (req, res) => {
    const productId = req.params.productId;
    const user = req.user;

    try {

        if(!productId){
            return res.status(400).json({error: "Invalid productId"})
        }

        const product = await productsModel.findById(productId)

        if(!product) {
            return res.status(404).send("Product not found")
        }

        if (product.owner === user.email || product.owner === user.role) {
            return res.render("updateProducts", { product });
        } else {
            res.render("errors/update-error");
        }
    } catch (err) {
        logger.error(`An error occurred while getting the product from the database. ${err.stack}`);
        res.status(500).send("Error fetching product")
    }
}