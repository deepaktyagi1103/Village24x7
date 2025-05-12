const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String,
    role: String,
    smartCoins: {
        type: Number,
        default: 0,  // 🟢 Coins initially 0 honge
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
