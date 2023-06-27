import express from 'express'
const router=express.Router()
import  { postSignup,verifyUserSignup ,resendOtp,userLogin,userLogout,resetPassword, VerifyResetOtp,setpassword} from '../controllers/userController.js'
import { userCheckAuth } from '../middleware/userAuth.js';


router.get('/auth',userCheckAuth)
router.post('/signup',postSignup)
router.post('/verifySignup',verifyUserSignup)
router.post('/resendOtp',resendOtp)
router.post('/login',userLogin)
router.get('/logout',userLogout )
router.post('/resetpassotp',resetPassword)
router.post('/verify-otp',VerifyResetOtp)
router.post('/setnewPassword',setpassword)

export default router