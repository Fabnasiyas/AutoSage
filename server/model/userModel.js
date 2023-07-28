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
    },
    bookingStatus:{
        type:Boolean,
        default:false
    },
    drivingLicense:{
        type:Array,
        require:true
    },
    aadharCard:{
        type:Array,
        require:true
    },
    isadminVerified:{
        type:Boolean,
        default:false 
    },
    wallet:{
        type:Number,
        default:0 
    }
   
    
})

const userModel=mongoose.model('userDetails',userSchema)
export default userModel