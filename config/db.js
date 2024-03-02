import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://sri-maddineni:FTyAUhjub2WCgU0B@ecommerce.zlkdwaf.mongodb.net/KisanRaj');
    console.log(`connected to db`.bgMagenta.white);
  } catch (error) {
    console.log(`error in ${error}`.bgRed.white);
  }
};

export default connectDB;
