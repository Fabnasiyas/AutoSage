import express from 'express'
const router=express.Router()
import { verifyVendor } from '../middleware/vendorAuth.js';
import {postSignup,verifyVendorSignup,vendorLogin,vendorLogout,getCarLists,editProfile,postCarRegistration,getBookings,updateStatus, vendorCheckAuth,getDashbordData,getMonthlyData,getvendorData} from '../controllers/vendorController.js'
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
router.get('/dashborddetails',getDashbordData)
router.get('/monthlyRevenue',getMonthlyData)
router.get('/vendor/:id',getvendorData)
export default router;