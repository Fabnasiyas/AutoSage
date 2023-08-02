
import express from 'express';
import {
  adminCheckAuth,
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
  TotalDetails,
  monthlyRevenue,
  handleApproveUser,
  handleDisapproveUser,
} from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/adminAuth.js'
const router = express.Router();

router.get('/auth', adminCheckAuth)

router.post('/login', adminLogin);
router.get('/logout', adminLogout);
router.use(verifyAdmin)
router.get('/dashboardDetails', TotalDetails)
router.get('/userList', getAllUsers);
router.put('/userList/ban/:userId', handleBanUser);
router.put('/userList/unban/:userId', handleunBanUser);

router.put('/userList/approve/:userId', handleApproveUser);
router.put('/userList/disapprove/:userId', handleDisapproveUser);
router.get('/vendorList', getAllVendors);
router.put('/vendorList/:vendorId', handleBanVendor);
router.put('/vendorList/unban/:vendorId', handleUnBanVendor);
router.get('/allcarlist', getallCarDetails);
router.get('/bookingList', getallBookings)
router.get('/monthlyRevenueData', monthlyRevenue)
export default router;
