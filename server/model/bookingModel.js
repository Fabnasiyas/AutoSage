import mongoose from 'mongoose'

const bookingSchema=mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'userModel', 
  },  
  vendorId:{
    type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
    ref: 'vendorModel', 
    },
    carId:{
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'carModel', 
        },
        bookingDate: {
            type: String,
            required: true,
          },
          pickupDate: {
            type: String,
            required: true,
          },
          dropoffDate: {
            type: String,
            required: true,
          }, 
          amountToPay:{
            type:Number,
            required:true,
          },
          totalAmount:{
            type:Number,
            required:true,
          }   ,
          balance:{
            type:Number,
            required:true,
          } ,
          paymentType:{
            type:'String',
            required:true
          } 
            
    
})

const bookingModel=mongoose.model('bookingDetails',bookingSchema)
export default bookingModel