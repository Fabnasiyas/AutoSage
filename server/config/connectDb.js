const mongoose=require('mongoose')

function dbConnect(){
    // mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://localhost:27017/AutoSage").then(()=>{
        console.log("db connected")
    }).catch(err=>{
        console.log(err)
    })
}

module.exports=dbConnect