import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoute.js'
import cors from "cors";
import path from 'path';
//configure env
// when file path is not root use dotenv.config({path:''}); else dotenv.config();
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

//routes 
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

//rest api
// app.get("/",(req,res)=>{
//     res.send("<h1>welcome to ecommer app mern stack project</h1>",);
// });

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

//PORT 
// const PORT = 8080;


//run listen
app.listen(process.env.PORT,()=>{
    console.log(`Server Running on ${process.env.PORT}`.bgCyan.white);
});