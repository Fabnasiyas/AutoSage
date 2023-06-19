const express=require('express')
const app=express()
const port=process.env.PORT || 5000;

const dbConnect=require('./config/connectDb')
dbConnect();

const cors = require('cors')
const cookieParser =require('cookie-parser')
const path =require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cors({ origin: ["http://localhost:3000", ], credentials: true, }));
app.use(cookieParser());
app.use(express.static(path.resolve()+"/public"))


// app.get('/',(req,res)=>{
//     res.send("welcome")
// })
app.listen(port,()=>{
    console.log(`Node Js Server Started at Port ${port}`);
})