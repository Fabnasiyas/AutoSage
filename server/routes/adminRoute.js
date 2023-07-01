import express from 'express'
import { adminLogin,adminLogout,getAllUsers,handleBanUser,handleunBanUser,getAllVendors,handleUnBanVendor,handleBanVendor,getallCarDetails } from  '../controllers/adminController.js'
import { adminCheckAuth } from '../middleware/adminAuth.js'
const router=express.Router()

router.get('/auth',adminCheckAuth)
router.post('/login',adminLogin)
router.get('/logout',adminLogout)
router.get('/userList',getAllUsers)
router.put('/userList/:userId',handleBanUser )
router.put('/userList/unban/:userId',handleunBanUser )
router.get('/vendorList',getAllVendors)
router.put('/vendorList/:vendorId',handleBanVendor)
router.put('/vendorList/unban/:vendorId',handleUnBanVendor)
router.get('/allcarlist',getallCarDetails)
export default router
