import mongoose from 'mongoose'; 
// const mongoose = require('mongose');
import dotenv from 'dotenv';
dotenv.config();

// dotenv.config();
//database connection
const connectDb = async () => {
    console.log("Connecting to MongoDB...");
    
    try {
        mongoose.connection.on("error", (error)=>{
            console.error("MongoDB connection error:", error);
        })

        const url =`${process.env.MONGODB_URL}/MentorProject`;

        
        await mongoose.connect(url);
        console.log("database connected successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;