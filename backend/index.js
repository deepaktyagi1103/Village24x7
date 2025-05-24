const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB =require('./config/db')
const router =require('./routes')
// const Order = require("../../models/orderModel");
// const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/index");

const app = express()
app.use(cors({
   origin: [
    "https://village24x7.vercel.app", 
    "https://www.village24x7.shop", 
    "http://localhost:3000"
  ],
    credentials: true,
}))
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())

app.use("/api",router)
// app.use("/api/orders", orderRoutes);
app.use("/api/payment", router);
// app.use("/api/orders", require("./routes/orderRoutes"));



// app.use('/api', paymentRoutes);
const PORT = process.env.PORT || 8080;


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Welcome to the Deepak Tyagi's Backend")
        console.log("Connected to DB")
        console.log("Server is running")
    })

})