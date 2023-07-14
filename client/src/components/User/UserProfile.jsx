
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const user = useSelector(state => state.user.details);

  return (
    user ? (
      <div className="flex min-h-screen mt-2">
        <div className="lg:w-1/3 p-8 bg-gray-100 flex flex-col justify-center">
          <div className="text-center">
            {/* User details */}
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <Link to="/adddocuments">
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add Document</button>
            </Link>
            <Link to="/edituserProfile">
              <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md ml-2">Edit</button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-2xl font-bold">Documents</h2>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200">Document Name</th>
                <th className="px-4 py-2 bg-gray-200">Category</th>
                <th className="px-4 py-2 bg-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Document 1</td>
                <td className="px-4 py-2">Category 1</td>
                <td className="px-4 py-2">Approved</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Document 2</td>
                <td className="px-4 py-2">Category 2</td>
                <td className="px-4 py-2">Pending</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    ) : null
    
  );
};

export default ProfilePage;
