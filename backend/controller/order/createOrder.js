const User = require("../models/userModel"); // Import User Model

const createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice } = req.body;

        const newOrder = new Order({
            user: userId,
            items,
            totalPrice,
            status: "Processing",
        });

        await newOrder.save();

        // 🟢 Calculate Smart Coins (2 coins per ₹100 spent)
        const coinsEarned = Math.floor(totalPrice / 100) * 2;

        // 🟢 Update User Coins
        const user = await User.findById(userId);
        if (user) {
            user.smartCoins += coinsEarned;
            await user.save();
        }

        res.status(201).json({ message: "Order placed successfully!", smartCoins: user.smartCoins });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error placing order" });
    }
};
