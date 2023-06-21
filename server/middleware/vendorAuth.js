import jwt from 'jsonwebtoken'
import vendorModel from '../model/vendorModel.js';

export const vendorCheckAuth=async(req,res)=>{
    const token = req.cookies.vendorToken;
    if(token){
    const verifyJwt= jwt.verify(token,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
    let ID=verifyJwt.id;
    const user=await vendorModel.findOne({_id:ID})
    if(user.ban==true){
        res.json({logged:false,err:true,message:'user banned',ban:true})
    }else{
        res.json({logged:true,details:user,ban:false})
    }
    }else{
     res.json({logged:false,err:true,message:'No token',ban:false})
    }
 }
 