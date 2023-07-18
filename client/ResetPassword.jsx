import React, { useState } from 'react';
import axios from '../../axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [resetEmail, setResetEmail] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/reset-password', { email: resetEmail });
      toast.success(response.data.message, {
        position: 'top-center',
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                Reset Email
              </label>
              <div className="mt-1">
                <input
                  id="reset-email"
                  name="reset-email"
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
