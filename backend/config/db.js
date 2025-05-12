

const mongoose = require("mongoose")

async function connectDB(params) {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
    }catch(err){
        console.log(err)
    }
    
}

module.exports = connectDB