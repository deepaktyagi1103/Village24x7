const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// ✅ Secure & Flexible CORS
const allowedOrigins = [
  "https://village24x7.vercel.app",
  "https://www.village24x7.shop",
  "https://village24x7.shop"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// ✅ All routes
app.use("/api", router);
app.use("/api/payment", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("✅ Welcome to the Deepak Tyagi's Backend");
    console.log("✅ Connected to DB");
    console.log("✅ Server is running on port", PORT);
  });
});
