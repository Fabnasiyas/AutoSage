import adminModel from '../model/adminModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';
import vendorModel from '../model/vendorModel.js'
import carModel from '../model/carModel.js';
import bookingModel from '../model/bookingModel.js'



 export const adminCheckAuth=async(req,res)=>{
        const token = req.cookies.adminToken;
        if(token){
        const verifyJwt= jwt.verify(token,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
        const admin=await adminModel.find({_id:verifyJwt.id})
        res.json({logged:true,details:admin})
        }else{
         res.json({logged:false,err:true,message:'No token'})
        }
     }
export const  adminLogin=async(req,res)=>{
    try {
        let {email,password}=req.body;
       
        let account=await adminModel.findOne({email:email})
       
        if(account){
            let status= await bcrypt.compare(password,account.password)
            if(status){
                const adminToken=jwt.sign({
                    id:account._id
                },"00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                return res.cookie("adminToken", adminToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'login success'}); 
            }else{
                res.json({err:true,message:"Invalid email or password"})
            }
        }else{
            res.json({err:true,message:'No admin found'})
        }
      } catch (error) {
        console.log(error);                   
      }     
    
} 

export const adminLogout = (req, res) => {
    return res
      .cookie('adminToken', '', {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
      })
      .json({ err: false, message: 'Logged out successfully' });
  };
  export const getAllUsers= async(req,res)=>{
    try{

        const users=await userModel.find({}).lean()
        res.json({data:users})
    }
    catch(error){
        console.log(error);
    }
    
  }
 export const handleBanUser= async (req, res) => {
    try {
      const userId = req.params.userId;
      // Update the user's ban status in the database
      await userModel.findByIdAndUpdate(userId, { ban: true });
  
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
  export const handleunBanUser= async (req, res) => {
    try {
      const userId = req.params.userId;
      // Update the user's ban status in the database
      await userModel.findByIdAndUpdate(userId, { ban: false });
  
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
  export const getAllVendors=async(req,res)=>{
    try{

        const vendors=await vendorModel.find({}).lean()
        res.json({data:vendors})
    }
    catch(error){
        console.log(error);
    }
    
  }
  
  export const handleBanVendor= async (req, res) => {
    try {
      const vendorId = req.params.vendorId;
      await vendorModel.findByIdAndUpdate(vendorId, { ban: true });
  
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
  export const handleUnBanVendor = async (req, res) => {
    try {
      const vendorId = req.params.vendorId;
      await vendorModel.findByIdAndUpdate(vendorId, { ban: false });
  
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };
  export const getallCarDetails=async (req,res)=>{
    try {
      const cars=await carModel.find({}).lean()
      res.json({data:cars});
    } catch (error) {
      console.log(error);
    }
  };
  export const getallBookings=async(req,res)=>{
try {
 const Bookings=await bookingModel.find({}).lean() 
res.json(Bookings)

} catch (error) {
  console.log(error); 
}
  }
  