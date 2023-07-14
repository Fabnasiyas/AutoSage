
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import DataTable from 'react-data-table-component';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isUnbanModalOpen, setIsUnbanModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

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

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      style: {
        paddingLeft: '16px',
      },
    },
    {
      name: 'User name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },

    {
      name: 'Banned Status',
      cell: (row) => (row.ban ? 'Banned' : 'Active'),
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <>
          {row.ban ? (
            <button
              className="text-red-500 bg-transparent border border-red-500 rounded-md px-3 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300"
              onClick={() => handleUnBanUser(row._id)}
            >
              Unban User
            </button>
          ) : (
            <button
              className="text-green-500 bg-transparent border border-green-500 rounded-md px-3 py-2 hover:bg-green-500 hover:text-white transition-colors duration-300"
              onClick={() => handleBanUser(row._id)}
            >
              Ban User
            </button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="  rounded-md" style={{ paddingRight: '300px', paddingTop: '200px', paddingLeft: '50px' }}
    >
      <div className="mb-4" >
        <input
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 "
        />
      </div>
      <DataTable
        columns={columns}
        data={users.filter((user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        pagination
        highlightOnHover
        noHeader
        striped
        responsive
        customStyles={{
          table: {
            marginBottom: 0,
          },
          header: {
            fontSize: '1rem',
            fontWeight: 'bold',
            backgroundColor: '#F3F4F6',
            color: '#111827',
            paddingTop: '12px',
            paddingBottom: '12px',
          },
          rows: {
            style: {
              minHeight: '56px', // Adjust the row height as needed
            },
          },
        }}
      />
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
