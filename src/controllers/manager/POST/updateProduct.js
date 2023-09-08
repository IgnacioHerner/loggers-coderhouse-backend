import productsModel from "../../../dao/models/product.model.js";

export const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const updateData = req.body

    try {

        if (!productId) {
            return res.status(400).send("Invalid productId");
        }
        const updatedProduct = await productsModel.findByIdAndUpdate(productId, updateData, {new: true})

        if (!updatedProduct) {
            return res.status(404).send("Product not found")
        }

        res.redirect('/api/products/manager')
    } catch (err) {
        logger.error(`An error occurred while updating the product. ${err.stack}`);
        res.status(500).send("Error updating product")
    }
}