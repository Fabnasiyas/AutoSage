import mongoose from 'mongoose'

const carSchema=mongoose.Schema({
    
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
    
})

const carModel=mongoose.model('carDetails',carSchema)
export default carModel