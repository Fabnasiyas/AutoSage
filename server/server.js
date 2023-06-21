import express from 'express';
const app=express()
const port=process.env.PORT || 5000;
import userRoute from './routes/userRoute.js'
import vendorRoute from './routes/vendorRoute.js'
import dbConnect from './config/connectDb.js'
dbConnect();

import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cors({ origin: ["http://localhost:3000", ], credentials: true, }));
app.use(cookieParser());
app.use(express.static(path.resolve()+"/public"))


app.use('/',userRoute)
// app.use('/admin',adminRoute)
app.use('/vendor',vendorRoute)
app.listen(port,()=>{
    console.log(`Node Js Server Started at Port ${port}`);
})