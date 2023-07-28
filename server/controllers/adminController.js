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

  export const handleApproveUser=async (req,res)=>{
    try{
    const userId = req.params.userId;
    // await userModel.findByIdAndUpdate(userId, { isadminVerified: true });
  await userModel.updateOne({_id:userId},{$set:{isadminVerified: true}})
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
  };
  export const handleDisapproveUser=async(req,res)=>{
    try {
      const userId = req.params.userId;
      await userModel.findByIdAndUpdate(userId, { isadminVerified: false });
  
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
  export const TotalDetails = async (req, res) => {
    try {
      const totalUsers = await userModel.countDocuments();
      const totalVendors = await vendorModel.countDocuments();
      const totalBookings = await bookingModel.countDocuments();
      const totalCars=await carModel.countDocuments();
      const today = new Date().toISOString();
const bookings = await bookingModel.find({ pickupDate: { $lte: today } });

let trevenue = 0;
for (const booking of bookings) {
  if (typeof booking.totalAmount === 'number' && !isNaN(booking.totalAmount)) {
    trevenue += booking.totalAmount;
  }
}

  
      const totalDetails = {
        totalUsers: totalUsers,
        totalVendors: totalVendors,
        totalBookings: totalBookings,
        revenue: trevenue,
        cars:totalCars
      };
  
    
      res.json(totalDetails);
    } catch (error) {
      console.error('Error calculating total details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  export const monthlyRevenue = async (req, res) => {
    try {
      const bookings = await bookingModel.find({}).lean();
  
     
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthlyRevenue = {};
      months.forEach((monthName) => {
        monthlyRevenue[monthName] = 0;
      });
  
      bookings.forEach((booking) => {
        const pickupDateStr = booking.pickupDate;
        const dateObject = new Date(pickupDateStr);
        const monthName = months[dateObject.getMonth()];
        const totalAmount = booking.totalAmount;
  
        
        if (typeof totalAmount === 'number') {
          monthlyRevenue[monthName] += totalAmount;
        }
      });
  
      const monthlyRevenueData = months.map((monthName) => ({
        month: monthName,
        revenue: monthlyRevenue[monthName],
      }));
      
      res.status(200).json(monthlyRevenueData);
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      res.status(500).json({ error: 'Error fetching monthly revenue' });
    }
  };
  