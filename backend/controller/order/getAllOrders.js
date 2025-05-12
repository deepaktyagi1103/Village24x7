const Order = require('../../models/orderModel'); // Ensure this is correct

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId'); // Populate userId to get customer details
        console.log("Fetched Orders:", orders); // Log the fetched orders
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = getAllOrders;