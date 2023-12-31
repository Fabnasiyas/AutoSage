import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { randomNumber } from '../helper/RandomNumber.js'
import { sentOTP } from '../helper/mail.js'
import carModel from '../model/carModel.js'
import bookingModel from '../model/bookingModel.js'
import { sendCancelMail } from '../helper/bookingcancelMail.js';

export const userCheckAuth = async (req, res) => {
  const token = req.cookies.userToken;
  if (token) {
    try {
      const verifyJwt = jwt.verify(
        token,
        process.env.SECRET_KEY
      );
      const ID = verifyJwt.id;
      const user = await userModel.findOne({ _id: ID });
      if (user.ban) {
        res.clearCookie('userToken');
        res.json({ logged: false, err: true, message: 'User banned', ban: true });
      } else {
        res.json({ logged: true, details: user, ban: false });
      }
    } catch (error) {
      res.json({ logged: false, err: true, message: 'Invalid token', ban: false });
    }
  } else {
    res.json({ logged: false, err: true, message: 'No token', ban: false });
  }
};

export const postSignup = async (req, res) => {
  try {
    let { name, email, phoneNumber, password, confirmPassword } = req.body
    const oldUser = await userModel.findOne({ email })
    if (oldUser) {
      res.json({ err: true, message: 'User already exsist' })
    } else {
      if (password == confirmPassword) {
        let otp = randomNumber()
        console.log(otp, "user");
        sentOTP(email, otp);
        const signupToken = jwt.sign({
          otp: otp,
        },
          process.env.SECRET_KEY);
        return res.cookie("signupToken", signupToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
        }).json({ err: false, message: 'Otp send successfull' });
      } else {
        res.json({ err: true, message: 'password entered are not same' })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const verifyUserSignup = async (req, res) => {
  const { name, email, phoneNumber, password, confirmPassword } = req.body
  let otp = req.body.OTP;
  let userToken = req.cookies.signupToken;
  const OtpToken = jwt.verify(userToken, process.env.SECRET_KEY)
  let bcrypPassword = await bcrypt.hash(password, 10)
  if (otp == OtpToken.otp) {
    let user = await userModel.create({
      name,
      email,
      phoneNumber,
      password: bcrypPassword
    });
    const userToken = jwt.sign({
      id: user._id
    },
      process.env.SECRET_KEY);
    return res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
    }).json({ err: false, message: 'User registration success' });
  } else {
    res.json({ err: true, message: 'something went wrong' })
  }
}

export const resendOtp = (req, res) => {
  const { email } = req.body;
  let otp = randomNumber()
  sentOTP(email, otp);
  const userToken = jwt.sign({
    otp: otp,
  },
    process.env.SECRET_KEY);
  return res.cookie("signupToken", userToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none",
  }).json({ err: false, message: 'Otp Resend successfull' });
}

export const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      if (user.ban == false) {
        let status = await bcrypt.compare(password, user.password);
        if (status) {
          const userToken = jwt.sign(
            {
              id: user._id,
            },
            process.env.SECRET_KEY
          );
          return res
            .cookie("userToken", userToken, {
              httpOnly: true,
              secure: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
              sameSite: "none",
            })
            .json({ err: false, message: 'User login success', user });
        } else {
          res.json({ err: true, message: "Invalid email or password" });
        }
      } else {
        res.clearCookie("userToken").json({ err: true, message: 'User banned' });
      }
    } else {
      res.json({ err: true, message: 'No user found, please signup.' });
    }
  } catch (error) {
    console.log(error);
  }
}


export const userLogout = (req, res) => {
  return res
    .cookie('userToken', '', {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
    })
    .cookie('signupToken', '', {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
    })
    .json({ err: false, message: 'Logged out successfully' });
};

export const resetPassword = async (req, res) => {
  const { email } = req.body
  let oldUser = await userModel.findOne({ email: email })
  if (oldUser) {
    let otp = randomNumber()
    console.log("Reset Password OTP", otp);
    sentOTP(email, otp)
    const userToken = jwt.sign({
      otp: otp,
    },
      process.env.SECRET_KEY);
    return res.cookie("resetToken", userToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
    }).json({ err: false, message: 'Otp send successfull' });
  } else {
    res.json({ err: true, message: 'Email is not registered' })
  }
}

export const VerifyResetOtp = async (req, res) => {
  let otp = req.body.otp;
  let userToken = req.cookies.resetToken;
  const OtpToken = jwt.verify(userToken, process.env.SECRET_KEY)
  if (otp == OtpToken.otp) {
    res.json({ err: false })
  } else {
    res.json({ err: true })
  }
}

export const setpassword = async (req, res) => {
  const { email, newPassword } = req.body;
  let bcrypPassword = await bcrypt.hash(newPassword, 10)
  await userModel.updateOne({ email: email }, {
    $set: {
      password: bcrypPassword
    }
  }).then((result) => {
    res.json({ err: false, result, message: 'Reset password successfull' })
    console.log("reset password sucessful");
  }).catch(err => {
    res.json({ err: true, message: 'something went wrong' })
  })
}

export const getCars = async (req, res) => {
  try {
    const cars = await carModel.find({}).limit(4).skip(3);
    res.json(cars);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getviewcardetails = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await carModel.findOne({ _id: carId });
    const books = await bookingModel.findOne({ carId: carId });
    const data = {
      car: car,
      books: books
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
};

export const editprofile = async (req, res) => {
  try {
    let { name, phoneNumber, userId } = req.body
    await userModel.updateOne({ _id: userId }, { $set: { name, phoneNumber } });
    res.status(200).json({ message: 'Vendor profile updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating the vendor profile' });
  }
}

export const uploadDocument = async (req, res) => {
  try {
    const { drivingLicense, aadharCard } = req.files;
    const userId = req.body.userId;
    await userModel.updateOne({ _id: userId }, { $set: { drivingLicense, aadharCard } })
    res.status(200).json({ success: true, message: 'Documents updated successfully' });
  } catch (error) {
    res.status(500).json({ err: true, message: 'Internal server error' });
    console.log(error);
  }
}

export const getallCars = async (req, res) => {
  try {
    const cars = await carModel.find({}).lean();
    res.json(cars);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const bookCar = async (req, res) => {
  try {
    const { userId, vendorId, carId, pickupDate, dropoffDate, bookingDate, amountToPay, totalAmount, balance, paymentType } = req.body;
    const booking = await bookingModel.create({
      userId,
      vendorId,
      carId,
      pickupDate,
      dropoffDate,
      bookingDate,
      amountToPay,
      paymentType,
      balance,
      totalAmount
    });
    const updatedCar = await carModel.findByIdAndUpdate(carId, { isBooked: true }, { new: true });
    res.status(200).json({ booking, updatedCar });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const getUserbookings = async (req, res) => {
  try {
    const userId = req.query.userId;
    const userbookings = await bookingModel.find({ userId });
    const bookingsWithCarDetails = await Promise.all(
      userbookings.map(async (booking) => {
        const carData = await carModel.findById(booking.carId);
        return { ...booking._doc, carData };
      })
    );
    res.json(bookingsWithCarDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId, message } = req.body;
    const booking = await bookingModel.findById(bookingId);
    const amount = booking.amountToPay;
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const userId = booking.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userEmail = user.email;
    const userUpdate = await userModel.updateOne(
      {
        _id: userId
      },
      { $inc: { wallet: amount } }
    );
    const carUpdate = await carModel.updateOne(
      { _id: booking.carId },
      { $set: { isBooked: false } }
    );
    if (carUpdate.nModified === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    await bookingModel.updateOne(
      { _id: bookingId },
      { $set: { isCancelled: true } }
    );
    await sendCancelMail(userEmail, bookingId, message);
    res.json({ message: 'Booking cancelled and email sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const advanceComplete = async (req, res) => {
  const { bookingDetails, paymentAmount } = req.body;
  const { _id } = bookingDetails;
  try {
    const updateResult = await bookingModel.updateOne({ _id }, { $set: { balance: 0 } });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.sendStatus(500);
  }
};

export const viewCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await carModel.findOne({ _id: carId });
    const books = await bookingModel.findOne({ carId: carId });
    const data = {
      car: car,
      books: books
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
};

export const updateWallet = async (req, res) => {
  const { userId } = req.params;
  const { wallet } = req.body;
  try {
    const updatedUser = await userModel.updateOne({ _id: userId }, { $set: { wallet: wallet } });
    if (updatedUser.nModified === 1) {
      return res.json({ message: 'Wallet updated successfully', wallet: wallet });
    } else {
      return res.status(404).json({ error: 'User not found or wallet not updated' });
    }
  } catch (error) {
    console.error('Error updating wallet:', error);
    return res.status(500).json({ error: 'Error updating wallet' });
  }
};

export const updateAmount = async (req, res) => {
  const { userId } = req.params;
  const { wallet } = req.body;
  const { vendorId, carId, pickupDate, dropoffDate, bookingDate, amountToPay, totalAmount, balance, paymentType } = req.body.bookingData;
  try {
    const booking = await bookingModel.create({
      userId,
      vendorId,
      carId,
      pickupDate,
      dropoffDate,
      bookingDate,
      amountToPay,
      paymentType,
      balance,
      totalAmount
    });
    const updatedCar = await carModel.findByIdAndUpdate(carId, { isBooked: true }, { new: true });
    const updatedUser = await userModel.updateOne({ _id: userId }, { $set: { wallet: wallet } });
    if (updatedUser.modifiedCount === 1) {
      res.status(200).json({ booking, updatedCar });
    } else {
      return res.status(404).json({ error: 'User not found or wallet not updated' });
    }
  } catch (error) {
    console.error('Error updating wallet:', error);
    return res.status(500).json({ error: 'Error updating wallet' });
  }
}

export const advance = async (req, res) => {
  try {
    const { userId, bookingId, updatedWallet } = req.body;
    await userModel.updateOne(
      { _id: userId },
      { $set: { wallet: updatedWallet } }
    );
    await bookingModel.updateOne(
      { _id: bookingId },
      { $set: { balance: 0 } }
    );
    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    console.error('Error processing wallet payment:', error);

    res.status(500).json({ error: 'An error occurred while processing the payment' });
  }
};