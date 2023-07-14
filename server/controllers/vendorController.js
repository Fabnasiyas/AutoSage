import vendorModel from '../model/vendorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { randomNumber } from '../helper/RandomNumber.js'
import { sentOTP } from '../helper/mail.js'
import carModel from '../model/carModel.js'

export const postSignup=async(req,res)=>{
       
    try {

        let {name,email,phoneNumber,password,pincode,confirmPassword}=req.body;

        const oldUser=await vendorModel.findOne({email})
        if(oldUser){
            res.json({err:true,message:'Vendor already exsist'})
        }else{
            if(password==confirmPassword){
                
               let otp=randomNumber()
               console.log(otp);
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
  console.log(req.body)
    const {name,email,phoneNumber,pincode,password,confirmPassword}=req.body
    let otp=req.body.OTP;
    let vendorToken=req.cookies.signupToken;
     const OtpToken = jwt.verify(vendorToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
    let bcrypPassword=await bcrypt.hash(password,10)
    if(otp==OtpToken.otp){

        let vendor= await vendorModel.create({
            name,
            email,
            phoneNumber,
            pincode,
            // location:req.body.location.location,
            // coordinates:req.body.location.coordinates,
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

export const vendorLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
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
      const { model, year, mileage, fuelType, transmissionMode, specifications,  rentPerDay,vendorId } = req.body;
      const { rcImage, carImages } = req.files
      
      if (!rcImage) {
        return res.status(400).json({ err: true, message: 'rcImage is required' });
      }  
      const cars = await carModel.create({
        vendorId,
        model,
        year,
        mileage,
        fuelType,
        transmissionMode,
        specifications,
        rentPerDay,
        rcImage,
        carImages,
        location:req.body.location,
        coordinates:req.body.coordinates,
      });


  
      res.json({ err: false, message: 'car details added' });
    }
     catch (error) {
      console.log(error);
      res.status(500).json({ err: true, message: 'Internal server error' });
    }
  };
  export const editProfile=async(req,res)=>{
    try{
      let {name,phoneNumber,pincode,vendorId}=req.body
      await vendorModel.updateOne({ _id: vendorId }, { $set: { name, phoneNumber,pincode } });
      res.status(200).json({ message: 'Vendor profile updated successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while updating the vendor profile' });
    }
  }
  export const getCatLists = async (req, res) => {
    try {
      const vendorid = req.params.vendorId;
      const cars = await carModel.find({ vendorId: vendorid }).lean();
      res.json({ data: cars });
    } catch (error) {
      console.log(error);
    }
  };
