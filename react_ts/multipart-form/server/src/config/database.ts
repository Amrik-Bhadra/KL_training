import mongoose from "mongoose";
import { env } from "./env";

const connectToDB = async (): Promise<void> => {
    const mongo_uri = env.MONGO_URI;
    if (!mongo_uri) {
        console.log('❌ MONGO_URI not set in env');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongo_uri);
        console.log('✅ MongoDB connected successfully!');
    } catch (error) {
        console.log('❌ MongoDB failed to connect!');
        process.exit(1);
    }


    mongoose.connection.on("error", (err) => {
        console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ MongoDB disconnected!");
    });
}

export default connectToDB;