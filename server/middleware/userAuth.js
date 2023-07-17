

import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

export const verifyUser = async (req, res,next) => {
  console.log('====================================');
  console.log('enterrrrr hereeeeeeeeee');
  console.log('====================================');
  const token = req.cookies.userToken;
  if (token) {
    try {
      const verifyJwt = jwt.verify(
        token,
        '00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa'
      );
      const ID = verifyJwt.id;
      const user = await userModel.findOne({ _id: ID });
      if (user.ban) {
        // User is banned, clear the token and log them out immediately
        res.clearCookie('userToken');
        res.json({ logged: false, err: true, message: 'User banned', ban: true });
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
