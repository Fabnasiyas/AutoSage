import jwt from 'jsonwebtoken';
import vendorModel from '../model/vendorModel.js';

export const verifyVendor = async (req, res, next) => {
  const token = req.cookies.vendorToken;
  if (token) {
    try {
      const verifyJwt = jwt.verify(
        token,
        '00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa'
      );
      const ID = verifyJwt.id;
      const vendor = await vendorModel.findOne({ _id: ID });
      if (vendor.ban) {
        //vendor  is banned, clear the token and log them out immediately
        res.clearCookie('vendorToken');
        res.json({ logged: false, err: true, message: 'vendor banned', ban: true });
      } else {
        next()
      }
    } catch (error) {
      // Handle JWT verification error
      res.json({ logged: false, err: true, message: 'Invalid token', ban: false });
    }
  } else {
    res.json({ logged: false, err: true, message: 'No token', ban: false });
  }

};