import mongoose from 'mongoose'

const vendorSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
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

const vendorModel=mongoose.model('vendorDetails',vendorSchema)
export default vendorModel