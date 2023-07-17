import express from 'express'
const router=express.Router()
import  { postSignup,verifyUserSignup ,resendOtp,userLogin,userLogout,resetPassword, VerifyResetOtp,setpassword,getCars,getviewcardetails,editprofile,uploadDocument,getallCars,bookCar,getUserbookings,cancelBooking, userCheckAuth} from '../controllers/userController.js'
import multipleUpload from '../helper/multer.js';
import { verifyUser } from '../middleware/userAuth.js';


router.get('/auth',userCheckAuth)
router.post('/signup',postSignup)
router.post('/verifySignup',verifyUserSignup)
router.post('/resendOtp',resendOtp)
router.post('/login',userLogin)
router.post('/resetpassotp',resetPassword)
router.post('/verify-otp',VerifyResetOtp)
router.post('/setnewPassword',setpassword)
router.get('/getcars',getCars)

router.get('/viewcardetails/:id',getviewcardetails)  
router.use(verifyUser)
router.get('/logout',userLogout )
router.post('/usereditprofile',editprofile)
router.post('/uploadDocuments',multipleUpload.fields([{
    name:'aadharCard',maxCount:3},
    {name:'drivingLicense',maxCount:3}
]),uploadDocument)
router.get('/getallcarlist',getallCars)
router.post('/bookings',bookCar)
router.get('/userbookings',getUserbookings)
router.post('/cancelBooking',cancelBooking)
export default router