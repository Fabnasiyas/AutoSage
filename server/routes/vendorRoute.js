import express from 'express'
const router=express.Router()
import { vendorCheckAuth } from '../middleware/vendorAuth.js';
import {postSignup,verifyVendorSignup} from '../controllers/vendorController.js'


router.get('/auth',vendorCheckAuth)
router.post('/signup',postSignup)
router.post('/verifySignup',verifyVendorSignup)
// router.post('/vendor/resendOtp',resendOtp)
// router.post('/vendor/login',userLogin)
// router.get('/vendor/logout',userLogout )

export default router;