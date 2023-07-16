
import express from 'express';
import {
  adminLogin,
  adminLogout,
  getAllUsers,
  handleBanUser,
  handleunBanUser,
  getAllVendors,
  handleUnBanVendor,
  handleBanVendor,
  getallCarDetails,
  getallBookings,
} from '../controllers/adminController.js';
import { adminCheckAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/auth', adminCheckAuth, (req, res) => {
  // Middleware is called before this handler
  res.json({ logged: true, details: req.admin });
});

router.post('/login', adminLogin);
router.get('/logout', adminLogout);
router.get('/userList', adminCheckAuth, getAllUsers);
router.put('/userList/:userId', adminCheckAuth, handleBanUser);
router.put('/userList/unban/:userId', adminCheckAuth, handleunBanUser);
router.get('/vendorList', adminCheckAuth, getAllVendors);
router.put('/vendorList/:vendorId', adminCheckAuth, handleBanVendor);
router.put('/vendorList/unban/:vendorId', adminCheckAuth, handleUnBanVendor);
router.get('/allcarlist', adminCheckAuth, getallCarDetails);
router.get('/bookingList',adminCheckAuth,getallBookings)
export default router;
