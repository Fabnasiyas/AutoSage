import mongoose from "mongoose"

function dbConnect(){
    // mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://localhost:27017/AutoRent").then(()=>{
        console.log("db connected")
    }).catch(err=>{
        console.log(err)
    })
}
export default dbConnect