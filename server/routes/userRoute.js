import express from 'express'
const router = express.Router()
import { postSignup, verifyUserSignup, resendOtp, userLogin, userLogout, resetPassword, VerifyResetOtp, setpassword, getCars, getviewcardetails, editprofile, uploadDocument, getallCars, bookCar, getUserbookings, cancelBooking, userCheckAuth, advanceComplete, viewCar, updateWallet } from '../controllers/userController.js'
import multipleUpload from '../helper/multer.js';
import { verifyUser } from '../middleware/userAuth.js';


router.get('/auth', userCheckAuth)
router.post('/signup', postSignup)
router.post('/verifySignup', verifyUserSignup)
router.post('/resendOtp', resendOtp)
router.post('/login', userLogin)
router.post('/resetpassotp', resetPassword)
router.post('/verify-otp', VerifyResetOtp)
router.post('/setnewPassword', setpassword)
router.get('/getcars', getCars)

router.get('/viewcardetails/:id', getviewcardetails)
router.get('/getallcarlist', getallCars)
router.get('/viewcar/:id', viewCar)
router.use(verifyUser)
router.get('/logout', userLogout)
router.post('/editprofile', editprofile)
router.post('/uploadDocuments', multipleUpload.fields([{
    name: 'aadharCard', maxCount: 3
},
{ name: 'drivingLicense', maxCount: 3 }
]), uploadDocument)
router.post('/bookings', bookCar)
router.get('/userbookings', getUserbookings)
router.post('/cancelBooking', cancelBooking)
router.post('/advanceComplete', advanceComplete)
router.post('/update-wallet/:userId', updateWallet)
// router.get('/geocode/:location',getLocations)
export default router