
import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const AdminCarList = () => {
  const [cars, setCars] = useState([]);

  const fetchAllCars = async () => {
    try {
      const response = await axios.get("/admin/allcarlist");
      if (!response.data.err) {
        setCars(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto" style={{  marginRight: '100px' }}>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{ marginTop: '100px' }}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                VendorId
              </th>
              <th scope="col" className="px-6 py-3">
                CarId
              </th>
              <th scope="col" className="px-6 py-3">
                Car Model
              </th>
              <th scope="col" className="px-6 py-3">
                Car Year
              </th>
              <th scope="col" className="px-6 py-3">
                Rent Per Day
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 ">{index + 1}</td>
                <td className="px-6 py-4 " >{car.vendorId}</td>
                <td className="px-6 py-4">{car._id}</td>
                <td className="px-6 py-4 ">{car.model}</td>
                <td className="px-6 py-4">{car.year}</td>
                <td className="px-6 py-4">{car.rentPerDay}</td>
                <td className="px-6 py-4">{car.isBooked ? 'Booked' : 'Available'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCarList;
