import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { randomNumber } from '../helper/RandomNumber.js'
import { sentOTP } from '../helper/mail.js'
import carModel from '../model/carModel.js'

 export const postSignup=async(req,res)=>{
       
        try {

            let {name,email,phoneNumber,password,confirmPassword}=req.body
            console.log(req.body);
            // console.log(req.files);
            // const{aadharCard,drivingLicense}=req.files;
            console.log(req.body);
            const oldUser=await userModel.findOne({email})
            if(oldUser){
                res.json({err:true,message:'User already exsist'})
            }else{
                if(password==confirmPassword){
                    
                   let otp=randomNumber()
                   console.log(otp,"user");

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
    export const verifyUserSignup=async(req,res)=>{
        const {name,email,phoneNumber,password,confirmPassword}=req.body
        // const{aadharCard,drivingLicense}=req.files;
        console.log(req.files);

        let otp=req.body.OTP;
        let userToken=req.cookies.signupToken;
         const OtpToken = jwt.verify(userToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
        let bcrypPassword=await bcrypt.hash(password,10)
        if(otp==OtpToken.otp){

            let user= await userModel.create({
                name,
                email,
                // aadharCard,
                // drivingLicense,
                phoneNumber,
                password:bcrypPassword
            });
            const userToken=jwt.sign({
                id:user._id
            },
            "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
            return res.cookie("userToken", userToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
            }).json({ err: false ,message:'User registration success'});
        }else{
            res.json({err:true,message:'something went wrong'})
        }

    }
      export const resendOtp=(req,res)=>{
        const {email}=req.body;
        let otp=randomNumber()
               sentOTP(email,otp);
                const userToken=jwt.sign({
                    otp:otp,

                },
                "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                return res.cookie("signupToken", userToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'Otp Resend successfull'});
    }
 
    export const userLogin = async (req, res) => {
      try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) {
          if (user.ban == false) {
            let status = await bcrypt.compare(password, user.password);
            if (status) {
              const userToken = jwt.sign(
                {
                  id: user._id,
                },
                "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa"
              );
              return res
                .cookie("userToken", userToken, {
                  httpOnly: true,
                  secure: true,
                  maxAge: 1000 * 60 * 60 * 24 * 7,
                  sameSite: "none",
                })
                .json({ err: false, message: 'User login success', user });
            } else {
              res.json({ err: true, message: "Invalid email or password" });
            }
          } else {
            // User is banned, so log them out immediately
            res.clearCookie("userToken").json({ err: true, message: 'User banned' });
          }
        } else {
          res.json({ err: true, message: 'No user found, please signup.' });
        }
      } catch (error) {
        console.log(error);
      }
    }
    
      
      export const userLogout = (req, res) => {
        return res
          .cookie('userToken', '', {
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
      
      export const resetPassword=async(req,res)=>{
        const {email}=req.body
        let oldUser=await userModel.findOne({email:email})
        if(oldUser){
            let otp=randomNumber()
            sentOTP(email,otp)
               const userToken=jwt.sign({
                    otp:otp,

                },
                "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                return res.cookie("resetToken", userToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'Otp send successfull'});
                
            
        }else{
            res.json({err:true,message:'Email is not registered'})
        }
    }
    export const VerifyResetOtp=async(req,res)=>{
        let otp=req.body.otp;
        let userToken=req.cookies.resetToken;
         const OtpToken = jwt.verify(userToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
        if(otp==OtpToken.otp){
            res.json({err:false})
        }else{
            res.json({err:true})
        }
    }
    export const setpassword=async(req,res)=>{
        const {email,newPassword}=req.body;
        let bcrypPassword=await bcrypt.hash(newPassword,10)
        await userModel.updateOne({email:email},{$set:{
            password:bcrypPassword
        }}).then((result)=>{
            res.json({err:false,result,message:'Reset password successfull'})
        }).catch(err=>{
            res.json({err:true,message:'something went wrong'})
        })
    }
    export const getCars = async (req, res) => {
      try {
        const cars = await carModel.find({}).limit(4).skip(1);
        res.json(cars);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    export const getviewcardetails =async(req,res)=>{
      try {
       const carId=req.params.id
        const car = await carModel.findOne({ _id: carId });
        res.json(car);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
      }
    }
   
    export const editprofile=async(req,res)=>{
      try {
        let {name,phoneNumber,userId}=req.body
        await userModel.updateOne({ _id: userId }, { $set: { name, phoneNumber} });
        res.status(200).json({ message: 'Vendor profile updated successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the vendor profile' });
      }
    }
    export const uploadDocument=async(req,res)=>{
      try {
        const {drivingLicense,aadharCard}=req.files;
        console.log(req.files,'............................');
        console.log(req.params._id,"888888888888888888");
        // res.status(200).json({ success: true, message: 'Documents updated successfully' });
      } catch (error) {
        // res.status(500).json({ err: true, message: 'Internal server error' });

      }
    }