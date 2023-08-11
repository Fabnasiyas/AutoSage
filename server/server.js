import express from 'express';
const app = express()
const port = process.env.PORT || 5000;
import userRoute from './routes/userRoute.js'
import vendorRoute from './routes/vendorRoute.js'
import adminRoute from './routes/adminRoute.js'
import dbConnect from './config/connectDb.js'
dbConnect();
import 'dotenv/config';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: true, limit:"50mb" }));
app.use(cors({ origin: ["http://localhost:3000","https://autosagenew.vercel.app", "https://autosage.surge.sh"], credentials: true, }));
app.use(cookieParser());
app.use(express.static(path.resolve() + "/public"))


app.use('/vendor', vendorRoute)
app.use('/admin', adminRoute)
app.use('/', userRoute)
app.listen(port, () => {
  console.log(`Node Js Server Started at Port ${port}`);
})