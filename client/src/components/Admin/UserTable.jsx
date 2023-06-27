

import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isUnbanModalOpen, setIsUnbanModalOpen] = useState(false);

  const fetchUserList = async () => {
    try {
      const response = await axios.get('/admin/userList');
      if (!response.data.err) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleBanUser = (userId) => {
    setSelectedUserId(userId);
    setIsBanModalOpen(true);
  };

  const handleUnBanUser = (userId) => {
    setSelectedUserId(userId);
    setIsUnbanModalOpen(true);
  };

  const confirmBanUser = async () => {
    try {
      const response = await axios.put(`/admin/userList/${selectedUserId}`, {
        ban: true,
      });
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUserId ? { ...user, ban: true } : user
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
    setIsBanModalOpen(false);
  };

  const confirmUnbanUser = async () => {
    try {
      const response = await axios.put(`/admin/userList/unban/${selectedUserId}`, {
        ban: false,
      });
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUserId ? { ...user, ban: false } : user
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
    setIsUnbanModalOpen(false);
  };

  return (
    <div>
      <div className="relative overflow-x-auto" style={{ marginTop: '100px', marginRight: '100px' }}>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{ marginTop: '100px' }}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Banned Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                {user.ban ? (
                  <td className="px-6 py-4 text-red-700">Banned</td>
                ) : (
                  <td className="px-6 py-4 text-green-700">Active</td>
                )}
                <td>
                  {user.ban ? (
                    <button
                      className="text-red-500 bg-transparent border border-red-500 rounded-md px-3 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300"
                      onClick={() => handleUnBanUser(user._id)}
                    >
                      Unban User
                    </button>
                  ) : (
                    <button
                      className="text-green-500 bg-transparent border border-green-500 rounded-md px-3 py-2 hover:bg-green-500 hover:text-white transition-colors duration-300"
                      onClick={() => handleBanUser(user._id)}
                    >
                      Ban User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isBanModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded shadow-lg p-6">
            <p className="mb-4">Are you sure you want to ban this user?</p>
            <div className="flex justify-end">
              <button
                className="text-red-500 bg-transparent border border-red-500 rounded-md px-3 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300 mr-2"
                onClick={() => setIsBanModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="text-white bg-red-500 rounded-md px-3 py-2 hover:bg-red-600 transition-colors duration-300"
                onClick={confirmBanUser}
              >
                YES
              </button>
            </div>
          </div>
        </div> 
      )}
      {isUnbanModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded shadow-lg p-6">
            <p className="mb-4">Are you sure you want to unban this user?</p>
            <div className="flex justify-end">
              <button
                className="text-gray-500 bg-transparent border border-gray-500 rounded-md px-3 py-2 hover:bg-gray-500 hover:text-white transition-colors duration-300 mr-2"
                onClick={() => setIsUnbanModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="text-white bg-green-500 rounded-md px-3 py-2 hover:bg-green-600 transition-colors duration-300"
                onClick={confirmUnbanUser}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
