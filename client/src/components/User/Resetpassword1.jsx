import React, { useState } from 'react';
import axios from '../../axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Resetpassword1 = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const handleGetOTP = async (e) => {
    e.preventDefault();

    try {
      // Send a request to /resetpassword
      axios.post('/resetpassotp', { email }).then((response) => {
        console.log(response.data);
        if (!response.data.err) {
          console.log(response.data);
          navigate('/resetpassotp', { state: { email: email } })
        }
      })
    } catch (error) {
      // Handle errors from the server
      toast.error(error.response.data.message, {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleGetOTP} on>
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {/* Get OTP button */}
            <div>

              {/* <Link to={'/resetpassotp'}> */}
              {/* <p className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"'>
                      GET OTP
                    </p> */}
              <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'> GET OTP</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword1;
