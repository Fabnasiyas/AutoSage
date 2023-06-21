import express from 'express'
const router=express.Router()
import  { postSignup,resetPassword,verifyUserSignup ,resendOtp,userLogin,userLogout } from '../controllers/userController.js'
import { userCheckAuth } from '../middleware/userAuth.js';


router.get('/auth',userCheckAuth)
router.post('/signup',postSignup)
router.post('/verifySignup',verifyUserSignup)
router.post('/resendOtp',resendOtp)
router.post('/login',userLogin)
router.get('/logout',userLogout )
router.post('/resetpassotp',resetPassword)

export default router