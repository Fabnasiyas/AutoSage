
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import DataTable from 'react-data-table-component';

const VendorTable = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isUnbanModalOpen, setIsUnbanModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVendorList = async () => {
    try {
      const response = await axios.get('/admin/vendorList');
      if (!response.data.err) {
        setVendors(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorList();
  }, []);

  const handleBanVendor = (vendorId) => {
    setSelectedVendor(vendorId);
    setIsBanModalOpen(true);
  };

  const handleUnBanVendor = (vendorId) => {
    setSelectedVendor(vendorId);
    setIsUnbanModalOpen(true);
  };

  const confirmBanAction = async () => {
    try {
      if (selectedVendor) {
        const response = await axios.put(`/admin/vendorList/${selectedVendor}`, {
          ban: true,
        });
        if (response.data.success) {
          setVendors((prevVendors) =>
            prevVendors.map((vendor) =>
              vendor._id === selectedVendor ? { ...vendor, ban: true } : vendor
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsBanModalOpen(false);
    setSelectedVendor(null);
  };

  const confirmUnbanAction = async () => {
    try {
      if (selectedVendor) {
        const response = await axios.put(`/admin/vendorList/unban/${selectedVendor}`, {
          ban: false,
        });
        if (response.data.success) {
          setVendors((prevVendors) =>
            prevVendors.map((vendor) =>
              vendor._id === selectedVendor ? { ...vendor, ban: false } : vendor
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsUnbanModalOpen(false);
    setSelectedVendor(null);
  };

  const cancelAction = () => {
    setIsBanModalOpen(false);
    setIsUnbanModalOpen(false);
    setSelectedVendor(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Vendor Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: 'phoneNumber',
      sortable: true,
    },
    {
      name: 'Pincode',
      selector: 'pincode',
      sortable: true,
    },

    {
      name: 'Banned Status',
      selector: 'ban',
      sortable: true,
      cell: (row) => (row.ban ? 'Banned' : 'Active'),
    },
    {
      name: 'Action',
      cell: (row) =>
        row.ban ? (
          <button
            className="text-red-500 bg-transparent border border-red-500 rounded-md px-3 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300"
            onClick={() => handleUnBanVendor(row._id)}
          >
            Unban Vendor
          </button>
        ) : (
          <button
            className="text-green-500 bg-transparent border border-green-500 rounded-md px-3 py-2 hover:bg-green-500 hover:text-white transition-colors duration-300"
            onClick={() => handleBanVendor(row._id)}
          >
            Ban Vendor
          </button>
        ),
    },
  ];

  return (
    <div style={{ paddingRight: '200px', paddingTop: '200px', paddingLeft: '50px' }}>
      <div>
        <input
          type="text"
          placeholder="Search vendors"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-3 py-2 mb-6"

        />
      </div>
      <DataTable
        columns={columns}
        data={filteredVendors}
        pagination
        highlightOnHover
        striped
        noHeader
      />

      {isBanModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/3 p-6 rounded-md shadow-lg">
            <p className="text-lg font-semibold mb-4">Confirm Ban</p>
            <p className="text-gray-700 mb-8">
              Are you sure you want to ban this vendor?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md mr-2 hover:bg-red-600 transition-colors duration-300"
                onClick={confirmBanAction}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                onClick={cancelAction}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isUnbanModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/3 p-6 rounded-md shadow-lg">
            <p className="text-lg font-semibold mb-4">Confirm Unban</p>
            <p className="text-gray-700 mb-8">
              Are you sure you want to unban this vendor?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md mr-2 hover:bg-red-600 transition-colors duration-300"
                onClick={confirmUnbanAction}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                onClick={cancelAction}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorTable;
