
import React from 'react';
import { Link } from 'react-router-dom';
const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          User Profile
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Profile content */}
          <div className="space-y-6">
            {/* Profile picture */}
            <div className="flex justify-center">
              <img
                className="h-32 w-32 rounded-full"
                src="profile-picture.jpg"
                alt="Profile Picture"
              />
            </div>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="mt-1 text-md text-gray-900">John Doe</p>
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-md text-gray-900">johndoe@example.com</p>
            </div>
            {/* Biography */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Biography
              </label>
              <p className="mt-1 text-md text-gray-900">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut
                tempus ex, eget congue enim. Fusce ut mauris nec dui lobortis
                rhoncus id ac risus.
              </p>
            </div>
            {/* Edit Profile and Add Car Buttons */}
            <div className="flex">
              <div className="w-1/2">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </button>
              </div>
              <div className="w-1/2 ml-2">
                <Link to="/vendor/addcar">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add Car
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

