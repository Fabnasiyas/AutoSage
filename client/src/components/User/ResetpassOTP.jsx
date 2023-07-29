import React, { useState } from 'react';
import OTPInput from 'otp-input-react';
import axios from '../../axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function OtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const email = location?.state?.email;
console.log(email,'111111');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otp);

    // Send the OTP to the server for verification
    axios
      .post('/verify-otp', { otp })
      .then((response) => {
        if (!response.data.err) {
          console.log(response.data);
          toast.success(response.data.message, {
            position: 'top-center',
          });
          navigate('/SetNewPassword',{ state: { email } })
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded p-8">
        <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
          <p className="mb-4 text-center">Please enter the OTP.</p>
          <OTPInput
            value={otp}
            onChange={setOtp}
            autoFocus
            OTPLength={6}
            otpType="number"
            disabled={false}
            secure
            className="w-full border rounded py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpPage;