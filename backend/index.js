const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes'); // Master route file
const paymentRoutes = require('./routes/paymentRoutes'); // If separate
// const orderRoutes = require('./routes/orderRoutes'); // Uncomment if needed

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: [
    "https://village24x7.vercel.app", 
    "https://www.village24x7.shop", 
    "http://localhost:3000"
  ],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api", router); // All general routes
app.use("/api/payment", paymentRoutes); // Payment-specific routes

// app.use("/api/orders", orderRoutes); // Uncomment if using orders

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("✅ Welcome to Deepak Tyagi's Backend");
    console.log("✅ Connected to DB");
    console.log(`✅ Server running on port ${PORT}`);
  });
});
