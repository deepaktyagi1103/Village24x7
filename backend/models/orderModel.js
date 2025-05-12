const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: Array,
  totalPrice: Number,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
