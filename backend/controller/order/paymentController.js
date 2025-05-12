const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../../models/orderModel');
const User = require('../../models/userModel');
require('dotenv').config(); // ✅ Ensure dotenv is loaded

// ✅ Create Razorpay Order
const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        console.log("ENV KEY_ID:", process.env.RAZORPAY_KEY_ID);
        console.log("ENV SECRET:", process.env.RAZORPAY_SECRET_KEY);
        console.log("AMOUNT RECEIVED:", amount);

        if (!amount || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await instance.orders.create(options);
        console.log("✅ Created Razorpay Order:", order);

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("🔥 Razorpay Order Creation Error:", error);
        res.status(500).json({ message: "Failed to create Razorpay order" });
    }
};

// ✅ Verify Razorpay Payment
const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            items,
            totalPrice
        } = req.body;

        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // ✅ Use req.userId instead of req.user._id
        const newOrder = new Order({
            user: req.userId,
            items,
            totalPrice,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status: "Paid",
        });

        await newOrder.save();

        const user = await User.findById(req.userId); // ✅ update here too
        const coinsEarned = Math.floor(totalPrice / 100) * 2;
        if (user) {
            user.smartCoins += coinsEarned;
            await user.save();
        }

        res.status(200).json({ success: true, message: "Payment verified!", smartCoins: user.smartCoins });

    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


module.exports = { createOrder, verifyPayment };