import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';


const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      // Passwords match, proceed with password reset logic
      console.log('Password reset successful!');
      // Reset the form
axios.post('/setnewPassword',{newPassword}).then((response)=>{
  console.log(response.data);
  if(!response.data.err){
    console.log(response.data);
  navigate('/login')
  }
})
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="text-lg font-medium mb-2 block">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-lg font-medium mb-2 block">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
