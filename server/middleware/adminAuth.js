
import jwt from 'jsonwebtoken';
import adminModel from '../model/adminModel.js';

export const adminCheckAuth = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (token) {
      const verifyJwt = jwt.verify(
        token,
        '00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa'
      );
      const admin = await adminModel.find({});
      req.admin = admin; // Store the admin details in the request object
      next(); // Call the next middleware or route handler
    } else {
      res.json({ logged: false, err: true, message: 'No token' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
