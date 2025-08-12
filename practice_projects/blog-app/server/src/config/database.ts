import mongoose from "mongoose";

export const connectToDB = async() => {
    const mongo_uri = process.env.MONGO_URI
    if(!mongo_uri) throw new Error("MONGO_URI not set in .env");

    try{
        await mongoose.connect(mongo_uri);
        console.log('MongoDB connected ✅');
    }catch(error){
        console.log('MongoDB connection failed ❌');
        throw error;
    }
}