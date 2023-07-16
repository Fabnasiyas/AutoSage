

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { vendor } = useSelector(state => state);
  console.log(vendor);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          My Profile
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Profile content */}
          <div className="space-y-6">
            {/* Profile picture */}
            <div className="flex justify-center">
              {/* <img
                className="h-32 w-32 rounded-full"
                src="profile-picture.jpg"
                alt="Profile Picture"
              /> */}
            </div>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="mt-1 text-md text-gray-900">{vendor.details.name}</p>
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-md text-gray-900">{vendor.details.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <p className="mt-1 text-md text-gray-900">{vendor.details.phoneNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <p className="mt-1 text-md text-gray-900">{vendor.details.pincode}</p>
            </div>

            {/* Edit Profile and Add Car Buttons */}
            <div className="flex justify-center">
              <div className="w-1/2">
                <Link to="/vendor/editprofile">
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
