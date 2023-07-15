import express from 'express'
const router=express.Router()
import { vendorCheckAuth } from '../middleware/vendorAuth.js';
import {postSignup,verifyVendorSignup,vendorLogin,vendorLogout,getCarLists,editProfile,postCarRegistration,getBookings,updateStatus} from '../controllers/vendorController.js'
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
router.post('/editprofile',editProfile)
router.get('/carlist/:vendorId',getCarLists)
router.get('/bookinglist',getBookings)
router.patch('/updateCarStatus/:bookingId',updateStatus)
export default router;