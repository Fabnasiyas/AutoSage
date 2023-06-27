import vendorModel from '../model/vendorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { randomNumber } from '../helper/RandomNumber.js'
import { sentOTP } from '../helper/mail.js'
import carModel from '../model/carModel.js'

export const postSignup=async(req,res)=>{
       
    try {

        let {name,email,phoneNumber,password,confirmPassword}=req.body;
        console.log('///////////////////',req.body);
        const oldUser=await vendorModel.findOne({email})
        if(oldUser){
            res.json({err:true,message:'Vendor already exsist'})
        }else{
             console.log(password,confirmPassword);
            if(password==confirmPassword){
                
               let otp=randomNumber()
               sentOTP(email,otp);
                const signupToken=jwt.sign({
                    otp:otp,

                },
                "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                return res.cookie("signupToken", signupToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'Otp send successfull'});
                

            }else{

                res.json({err:true,message:'password entered are not same'})
            }
           
           
        }
        } catch (error) {
            console.log(error);
        }
}

export const verifyVendorSignup=async(req,res)=>{
    const {name,email,phoneNumber,password,confirmPassword}=req.body
    console.log('**********************',req.body)
    let otp=req.body.OTP;
    let vendorToken=req.cookies.signupToken;
    console.log('***********vendorToken************',vendorToken)
     const OtpToken = jwt.verify(vendorToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
    let bcrypPassword=await bcrypt.hash(password,10)
    console.log(bcrypPassword);
    if(otp==OtpToken.otp){

        let vendor= await vendorModel.create({
            name,
            email,
            phoneNumber,
            password:bcrypPassword
        });
        const vendorToken=jwt.sign({
            id:vendor._id
        },
        "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
        return res.cookie("vendorToken", vendorToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false ,message:'vendor registration success'});
    }else{
        res.json({err:true,message:'something went wrong'})
    }

}
// export const vendorLogin=async(req,res)=>{
//     try {
//       let {email,password}=req.body;
//       console.log("/////////////////////",req.body);
//       let vendor=await vendorModel.findOne({email:email})
//       if(vendor ){
//         if(vendor.ban==false){
//             let status= await bcrypt.compare(password,vendor.password)
//             if(status){
//                 const vendorToken=jwt.sign({
//                     id:vendor._id
//                 },"00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
//                 return res.cookie("vendorToken", vendorToken, {
//                     httpOnly: true,
//                     secure: true,
//                     maxAge: 1000 * 60 * 60 * 24 * 7,
//                     sameSite: "none",
//                 }).json({ err: false ,message:'vendor login success',vendor}); 
//             }else{
//                 res.json({err:true,message:"Invalid email or password"})
//             }
//         }else{
//             res.json({err:true,message:'vendor banned.'})
//         }
//       }else{
//           res.json({err:true,message:'No vendor found, please signup.'})
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
export const vendorLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("/////////////////////", req.body);
      const vendor = await vendorModel.findOne({ email: email });
      if (vendor) {
        if (vendor.ban === false) {
          const status = await bcrypt.compare(password, vendor.password);
          if (status) {
            const vendorToken = jwt.sign({ id: vendor._id }, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
            res.cookie("vendorToken", vendorToken, {
              httpOnly: true,
              secure: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
              sameSite: "none",
            });
            return res.json({ err: false, message: 'Vendor login success', vendor });
          } else {
            res.json({ err: true, message: "Invalid email or password" });
          }
        } else {
          res.clearCookie("vendorToken"); // Clear the vendorToken cookie
          res.json({ err: true, message: 'Vendor banned. Please contact the admin for assistance.' });
        }
      } else {
        res.json({ err: true, message: 'No vendor found, please sign up' });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const vendorLogout = (req, res) => {
    return res
      .cookie('vendorToken', '', {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
      })
      .cookie('signupToken', '', {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
      })
      .json({ err: false, message: 'Logged out successfully' });
  };

  export const postCarRegistration = async (req, res) => {
    try {
      const { model, year, mileage, fuelType, transmissionMode, specifications, rent } = req.body;
      console.log(req.body)
      console.log('car details', req.files);
      const { rcImage, carImages } = req.files// Set default values for rcImage and carImages
      if (!rcImage) {
        return res.status(400).json({ err: true, message: 'rcImage is required' });
      }
  
      console.log('car details', req.body);
  
      const cars = await carModel.create({
        model,
        year,
        mileage,
        fuelType,
        transmissionMode,
        specifications,
        rent,
        rcImage,
        carImages
      });
  
      res.json({ err: false, message: 'car details added' });
    }
     catch (error) {
      console.log(error);
      res.status(500).json({ err: true, message: 'Internal server error' });
    }
  };
  