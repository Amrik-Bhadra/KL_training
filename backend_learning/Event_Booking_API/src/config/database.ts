import mongoose from "mongoose";

const connectToDB = async() => {
    const mongo_uri = process.env.MONGO_URI;
    try{
        const conn = await mongoose.connect(mongo_uri as string);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);  // stops the app if db connection fails
    }
}

export default connectToDB;