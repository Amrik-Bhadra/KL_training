import mongoose from "mongoose"

const connectToDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectToDB;