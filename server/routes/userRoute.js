import express from 'express'
const router=express.Router()
import  { postSignup,verifyUserSignup ,resendOtp,userLogin,userLogout,resetPassword, VerifyResetOtp,setpassword,getCars,getviewcardetails,editprofile,uploadDocument} from '../controllers/userController.js'
import { userCheckAuth } from '../middleware/userAuth.js';
import multipleUpload from '../helper/multer.js';


router.get('/auth',userCheckAuth)
router.post('/signup',postSignup)
router.post('/verifySignup',verifyUserSignup)
router.post('/resendOtp',resendOtp)
router.post('/login',userLogin)
router.get('/logout',userLogout )
router.post('/resetpassotp',resetPassword)
router.post('/verify-otp',VerifyResetOtp)
router.post('/setnewPassword',setpassword)
router.get('/getcars',getCars)
router.get('/viewcardetails/:id',getviewcardetails)  
router.post('/usereditprofile',editprofile)
router.post('/uploadDocuments/:userId',multipleUpload.fields([{
    name:'aadharCard',maxCount:3},
    {name:'drivingLicense',maxCount:3}
]),uploadDocument)
export default router