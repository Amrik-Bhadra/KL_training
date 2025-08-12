import mongoose from "mongoose";

const connectToDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string);  
        console.log('✅ Database connected successfully');
    }catch(error){
        console.log('❌ Database connectivity failed!');
        process.exit(1);
    }
}

export default connectToDB;