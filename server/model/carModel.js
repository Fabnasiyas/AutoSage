import mongoose from 'mongoose'

const carSchema=mongoose.Schema({
    
    vendorId:{
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'userModel', 
        },
    model:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    mileage:{
        type:Number,
        required:true
    },
    fuelType:{
        type:String,
        required:true
    },
    transmissionMode:{
        type:String,
        require:true
    },
    specifications:{
        type:String,
        require:true
    },
    rentPerDay:{
        type:Number,
        require:true
    },
    rcImage:{
        type:Array,
        require:true
    },
    carImages:{
        type:Array,
        require:true
    },
    isBooked:{
        type:Boolean,
        default:false
    },
    location:{
        type:String,
        required:true
    },
    coordinates:{
        type:Array,
        require:true
    }
    
})

const carModel=mongoose.model('carDetails',carSchema)
export default carModel