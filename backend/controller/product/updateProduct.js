const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
    try {
        // Check permission; if denied, throw an error
        if (!uploadProductPermission(req.userId)) { // Assuming permission returns true for allowed
            throw new Error("Permission denied");
        }

        const { _id, ...resBody } = req.body;

        // Update the product
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

        // Send a successful response
        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false
        });

    } catch (error) { // Capture the error here
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = updateProductController;