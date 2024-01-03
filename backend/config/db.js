import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const con = mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${(await con).connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;