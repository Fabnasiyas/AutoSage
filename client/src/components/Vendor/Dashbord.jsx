// import React, { useEffect, useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import axios from '../../axios';
// import {  FaClipboardList, FaCar, FaMoneyBillAlt } from 'react-icons/fa';
// const DashboardPage = () => {
//     const { vendor } = useSelector(state => state);
//   const [totalCars, setTotalCars] = useState(0);
//   const [totalBookings, setTotalBookings] = useState(0);
//   const [revenue, setRevenue] = useState(0);
//  console.log(vendor.details._id);
//  const vendorId=vendor.details._id
//   useEffect(() => {
//     fetchTotalDetails();

//   }, []);

//   const fetchTotalDetails = async () => {
//     try {
//       const response = await axios.get('/vendor/dashborddetails', {
//         params: { vendorId } 
//       });
//       console.log(response);
//       const { totalCars, totalBookings, revenue } = response.data;
//       setTotalCars(totalCars);
//       setTotalBookings(totalBookings);
//       setRevenue(revenue);
//     } catch (error) {
//       console.error('Error fetching total details:', error);
//     }
//   };
 
  
  
  

//   return (
    
//     <div className="container mx-auto py-8 mt-10">
//       <div className="grid grid-cols-4 gap-6">
//         <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
//           <FaCar className="w-7 h-7 text-gray-500 mb-3" />
//           <a href="#">
//             <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Number of Cars</h5>
//           </a>
//           <h1>{totalCars}</h1>
//         </div>

       

//         <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
//           <FaClipboardList className="w-7 h-7 text-gray-500 mb-3" />
//           <a href="#">
//             <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Total Bookings</h5>
//           </a>
//           <h1>{totalBookings}</h1>
//         </div>

//         <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
//           <FaMoneyBillAlt className="w-7 h-7 text-gray-500 mb-3" />
//           <a href="#">
//             <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Revenue</h5>
//           </a>
//           <p>&#x20B9; {revenue}</p>
//         </div>
        
//       </div>

//     </div>
//   );
// };

// export default DashboardPage;
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { FaClipboardList, FaCar, FaMoneyBillAlt } from 'react-icons/fa';
import BarChart from '../Vendor/vendorBarchart'
const DashboardPage = () => {
  const { vendor } = useSelector(state => state);
  const vendorId = vendor.details._id;

  const [totalCars, setTotalCars] = useState(null);
  const [totalBookings, setTotalBookings] = useState(null);
  const [revenue, setRevenue] = useState(null);

  useEffect(() => {
    fetchTotalDetails();
  }, []);

  const fetchTotalDetails = async () => {
    try {
      const response = await axios.get('/vendor/dashborddetails', {
        params: { vendorId }
      });
      console.log(response);
      const { totalCars, totalBookings, revenue } = response.data;
      setTotalCars(totalCars);
      setTotalBookings(totalBookings);
      setRevenue(revenue);
    } catch (error) {
      console.error('Error fetching total details:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 mt-10">
      <div className="grid grid-cols-4 gap-6">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <FaCar className="w-7 h-7 text-gray-500 mb-3" />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Number of Cars</h5>
          </a>
          <h1>{totalCars !== null ? totalCars : 'Loading...'}</h1>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <FaClipboardList className="w-7 h-7 text-gray-500 mb-3" />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Total Bookings</h5>
          </a>
          <h1>{totalBookings !== null ? totalBookings : 'Loading...'}</h1>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <FaMoneyBillAlt className="w-7 h-7 text-gray-500 mb-3" />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Revenue</h5>
          </a>
          <p>{revenue !== null ? `₹ ${revenue}` : 'Loading...'}</p>
        </div>
      </div>
      <div>
        <BarChart/>
      </div>
    </div>
  );
};

export default DashboardPage;
