import React, { useState, useEffect } from 'react';
import OTPInput from 'otp-input-react';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function OtpPage() {
  const location = useLocation();
  const data = location.state.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [OTP, setOTP] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendAttempts, setResendAttempts] = useState(0);
  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(OTP);
    axios.post('/vendor/verifySignup', { OTP, ...data }).then((response) => {
      if (!response.data.err) {
        dispatch({ type: 'refresh' });
        console.log(response.data.message);
        toast.error(response.data.message, {
          position: "top-center"
        });
        navigate('/vendor/login');
      } else {
        toast.success(response.data.message);
      }
    });
  };

  const handleResendOTP = () => {
    if (resendAttempts < 3) {
      setResendAttempts((prevAttempts) => prevAttempts + 1);
      setTimer(60);
      axios.post('/vendor/resendOtp', { ...data }).then((response) => {
        console.log(response.data);
        toast.error(response.data, {
          position: "top-center"
        });
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded p-8">
        <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
          <p className="mb-4 text-center">Please enter the OTP.</p>
          <OTPInput
            value={OTP}
            onChange={setOTP}
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
          {timer === 0 && resendAttempts < 3 && (
            <button
              type="submit"
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm focus:outline-none"
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          )}
          {timer > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Resend OTP in {timer} s
            </p>
          )}
          {resendAttempts >= 3 && (
            <p className="text-red-500 text-sm mt-2">
              Maximum resend attempts reached
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default OtpPage;


