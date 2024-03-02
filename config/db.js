import mongoose from "mongoose";
import colors from 'colors';
import dotenv from 'dotenv';
const connectDB = async() => {
    try
    {
        const conn = await mongoose.connect('mongodb+srv://toor:toor@clusterkisan.hpraku2.mongodb.net/ecommerce');
        
        console.log(`Connected to Mongodb Database`.bgMagenta.white);
    }
    catch(error)
    {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;
