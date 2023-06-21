import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ban:{
        type:Boolean,
        default:false
    }
    
})

const userModel=mongoose.model('userDetails',userSchema)
export default userModel