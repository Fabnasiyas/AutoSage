import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useSelector } from 'react-redux';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const { vendor } = useSelector(state => state);
  const vendorId = vendor.details._id;

  const fetchCars = async () => {
    try {
      const response = await axios.get(`/vendor/carlist/${vendorId}`);
      if (!response.data.err) {
        setCars(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cars,'fghfhghjgjkgj');

  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <div className="relative overflow-x-auto" style={{ paddingTop: '100px', paddingRight: '100px' }}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Car Id
            </th>
            <th scope="col" className="px-6 py-3">
              Car Model
            </th>
            <th scope="col" className="px-6 py-3">
              Year
            </th>
            <th scope="col" className="px-6 py-3">
              Mileage
            </th>
            <th scope="col" className="px-6 py-3">
              fuel Type
            </th>
            <th scope="col" className="px-6 py-3">
              Transmission Mode
            </th>
            <th scope="col" className="px-6 py-3">
              Specification
            </th>
            <th scope="col" className="px-6 py-3">
              Rent Per day
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              RC Image
            </th>
            <th scope="col" className="px-6 py-3">
              car Images
            </th>

            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
           
            <tr
            
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                key={index + 1}
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
              </th>
              <td className="px-6 py-4">{car._id}</td>
              <td className="px-6 py-4">{car.model}</td>
              <td className="px-6 py-4">{car.year}</td>
              <td className="px-6 py-4">{car.mileage} kmpl</td>
              <td className="px-6 py-4">{car.fuelType}</td>
              <td className="px-6 py-4">{car.transmissionMode}</td>

              <td className="px-6 py-4">{car.specifications}</td>
              <td className="px-6 py-4">{car.rentPerDay}</td>
              <td className="px-6 py-4">{car.isBooked ? 'Booked' : 'Available'}</td>
              <td className="px-6 py-4">
                {car.rcImage.map((image, index) => (
                  <img key={index} src={`http://localhost:5000/images/${image.filename}`}  alt={`RC Image `} />
                ))}


              </td>

              <td className="px-6 py-4">
                {car.carImages.map((image, index) => (
                  <img key={index} src={`http://localhost:5000/images/${image.filename}`}alt={`Car Image `} />
                ))}
              </td>
              <td>
                <button className="text-red-900">Edit</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
