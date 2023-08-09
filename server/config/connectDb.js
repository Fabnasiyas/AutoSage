import mongoose from "mongoose"

function dbConnect() {
    mongoose.connect(process.env.CONNECTION_URL).then(() => {
        console.log("db connected")
    }).catch(err => {
        console.log(err)
    })
}
export default dbConnect