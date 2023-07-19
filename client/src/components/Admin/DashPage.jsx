import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { FaUsers, FaClipboardList, FaCar, FaMoneyBillAlt } from 'react-icons/fa';
import MonthlyBookingBarChart from '../Admin/monthlybookChart';

const DashboardPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [totalCars, setTotalCars] = useState(0); 

  useEffect(() => {
    fetchTotalDetails();
  }, []);

  const fetchTotalDetails = async () => {
    try {
      const response = await axios.get('/admin/dashboardDetails');
      const { totalUsers, totalVendors, totalBookings, revenue, cars } = response.data;
      setTotalUsers(totalUsers);
      setTotalVendors(totalVendors);
      setTotalBookings(totalBookings);
      setRevenue(revenue);
      setTotalCars(cars);
    } catch (error) {
      console.error('Error fetching total details:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 mt-10">
      <div className="grid grid-cols-5 gap-6"> {/* Set grid-cols-5 to have 5 cards in a row */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <FaUsers className="w-7 h-7 text-gray-500 mb-3" />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Total Users</h5>
          </a>
          <h1>{totalUsers}</h1>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <FaCar className="w-7 h-7 text-gray-500 mb-3" />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Total Vendors</h5>
          </a>
          <h1>{totalVendors}</h1>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <FaClipboardList className="w-7 h-7 text-gray-500 mb-3" />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Total Bookings</h5>
          </a>
          <h1>{totalBookings}</h1>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <FaMoneyBillAlt className="w-7 h-7 text-gray-500 mb-3" />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Revenue</h5>
          </a>
          <p>&#x20B9; {revenue}</p>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <FaCar className="w-7 h-7 text-gray-500 mb-3"  />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Total Cars</h5>
          </a>
          <h1>{totalCars}</h1>
        </div>
        <MonthlyBookingBarChart />
      </div>
    </div>
  );
};

export default DashboardPage;
