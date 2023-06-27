
import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const VendorTable = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isUnbanModalOpen, setIsUnbanModalOpen] = useState(false);

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
                Vendor name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
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
            {vendors.map((vendor, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {vendor.name}
                </td>
                <td className="px-6 py-4">{vendor.email}</td>
                <td className="px-6 py-4">{vendor.phoneNumber}</td>
                {vendor.ban ? (
                  <td className="px-6 py-4 text-red-700">Banned</td>
                ) : (
                  <td className="px-6 py-4 text-green-700">Active</td>
                )}
                <td>
                  {vendor.ban ? (
                    <button
                      className="text-red-500 bg-transparent border border-red-500 rounded-md px-3 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300"
                      onClick={() => handleUnBanVendor(vendor._id)}
                    >
                      Unban Vendor
                    </button>
                  ) : (
                    <button
                      className="text-green-500 bg-transparent border border-green-500 rounded-md px-3 py-2 hover:bg-green-500 hover:text-white transition-colors duration-300"
                      onClick={() => handleBanVendor(vendor._id)}
                    >
                      Ban Vendor
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
