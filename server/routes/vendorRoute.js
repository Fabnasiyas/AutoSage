import express from 'express'
const router=express.Router()
import { vendorCheckAuth } from '../middleware/vendorAuth.js';
import {postSignup,verifyVendorSignup,vendorLogin,vendorLogout,postCarRegistration} from '../controllers/vendorController.js'
import multipleUpload from '../helper/multer.js';

router.get('/auth',vendorCheckAuth)
router.post('/signup',postSignup)
router.post('/verifySignup',verifyVendorSignup)
// router.post('/vendor/resendOtp',resendOtp)
router.post('/login',vendorLogin)
router.get('/logout',vendorLogout)
router.post('/addcardetails',multipleUpload.fields([
    { name: 'rcImage', maxCount: 3 },
    { name: 'carImages', maxCount: 3 }
  ]),postCarRegistration)
export default router;