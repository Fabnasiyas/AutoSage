

// import React, { useEffect, useState } from 'react';
// import { FaCar, FaCog, FaGasPump } from 'react-icons/fa';
// import axios from '../../axios';
// import { Link } from 'react-router-dom';

// const Card = () => {
//   const [cars, setCars] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [carsPerPage] = useState(12);

//   const fetchCars = async () => {
//     try {
//       const response = await axios.get('/getallcarlist');
//       if (!response.data.err) {
//         setCars(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // Get current cars
//   const indexOfLastCar = currentPage * carsPerPage;
//   const indexOfFirstCar = indexOfLastCar - carsPerPage;
//   const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

//   // Change page
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="text-center mb-10">
//       <h1 className="text-3xl font-semibold mt-10 mb-10 text-blue-900">Our Cars</h1>
//       <div className="flex flex-wrap justify-center">
//         {currentCars.map((car, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center max-w-xs bg-white shadow-md rounded-lg overflow-hidden mx-4 my-4"
//           >
//             <img
//               src={`http://localhost:5000/images/${car.carImages[0].filename}`}
//               alt={`carImage`}
//               className="object-cover w-full h-40"
//             />
//             <div className="flex flex-col items-center p-4 mb-4">
//               <h2 className="text-lg font-semibold text-center text-blue-900 ">{car.model}</h2>
//               <p className="mt-2 text-blue-900">&#8377; {car.rentPerDay} / Days</p>
//               <div className="flex items-center mt-4 ">
//                 <div className="flex items-center mr-2">
//                   <FaCar className="mr-1" style={{ color: '#FDB221' }} />
//                   <p className="mt-1 text-sm">Model-{car.year}</p>
//                 </div>
//                 <div className="flex items-center mr-2">
//                   <FaCog className="mx-1" style={{ color: '#FDB221' }} />
//                   <p className="mt-1 text-sm">{car.specifications}</p>
//                 </div>
//                 <div className="flex items-center">
//                   <FaGasPump className="mx-1" style={{ color: '#FDB221' }} />
//                   <p className="mt-1 text-sm">{car.mileage} kmpl</p>
//                 </div>
//               </div>
//               <div className="mt-4 flex ">
//                 {car.isBooked ? (
//                   <button className="px-4 py-1 bg-gray-400 text-white" disabled>
//                     Booked
//                   </button>
//                 ) : (
//                   <button className="px-4 py-1 bg-blue-900 hover:bg-blue-600 text-white">
//                     Book Now
//                   </button>
//                 )}
//                 <Link to={`/viewcardetails/${car._id}`}>
//                   <button className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white">
//                     View Details
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
    
//       {/* Pagination */}
//       <ul className="flex justify-center mt-4">
//         {Array.from({ length: Math.ceil(cars.length / carsPerPage) }, (_, i) => (
//           <li
//             key={i}
//             className={`mx-1 cursor-pointer ${
//               i + 1 === currentPage ? 'font-semibold text-blue-900' : 'text-gray-600'
//             }`}
//             onClick={() => paginate(i + 1)}
//           >
//             {i + 1}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Card;

import React, { useEffect, useState } from 'react';
import { FaCar, FaCog, FaGasPump } from 'react-icons/fa';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
const Card = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCars = async () => {
    try {
      const response = await axios.get('/getallcarlist');
      if (!response.data.err) {
        setCars(response.data);
        setFilteredCars(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = cars.filter((car) => {
      const modelMatch = car.model.toLowerCase().includes(query.toLowerCase());
      const fuelTypeMatch = car.fuelType.toLowerCase().includes(query.toLowerCase());
      const transmissionModeMatch = car.transmissionMode.toLowerCase().includes(query.toLowerCase());
      const specificationsMatch = car.specifications.toLowerCase().includes(query.toLowerCase());
      const yearMatch = car.year.toString().includes(query.toLowerCase());
      return modelMatch || fuelTypeMatch || transmissionModeMatch || specificationsMatch || yearMatch;
    });
    setFilteredCars(filtered);
    setCurrentPage(1);
  };

  // Get current cars
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl font-semibold mt-10 mb-10 text-blue-900"></h1>
      
      <div className="max-w-xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-500 w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search by model, fuel type, transmission mode, specifications, or year"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className={`pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            searchQuery === '' ? 'text-gray-500' : 'text-black'
          }`}
        />
      </div>
    </div>
      <div className="flex flex-wrap justify-center">
        {currentCars.map((car, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-xs bg-white shadow-md rounded-lg overflow-hidden mx-4 my-4"
          >
            <img
              src={`http://localhost:5000/images/${car.carImages[0].filename}`}
              alt={`carImage`}
              className="object-cover w-full h-40"
            />
            <div className="flex flex-col items-center p-4 mb-4">
              <h2 className="text-lg font-semibold text-center text-blue-900 ">{car.model}</h2>
              <p className="mt-2 text-blue-900">&#8377; {car.rentPerDay} / Days</p>
              <div className="flex items-center mt-4 ">
                <div className="flex items-center mr-2">
                  <FaCar className="mr-1" style={{ color: '#FDB221' }} />
                  <p className="mt-1 text-sm">Model-{car.year}</p>
                </div>
                <div className="flex items-center mr-2">
                  <FaCog className="mx-1" style={{ color: '#FDB221' }} />
                  <p className="mt-1 text-sm">{car.specifications}</p>
                </div>
                <div className="flex items-center">
                  <FaGasPump className="mx-1" style={{ color: '#FDB221' }} />
                  <p className="mt-1 text-sm">{car.mileage} kmpl</p>
                </div>
              </div>
              <div className="mt-4 flex ">
                {car.isBooked ? (
                  <button className="px-4 py-1 bg-gray-400 text-white" disabled>
                    Booked
                  </button>
                ) : (
                  <button className="px-4 py-1 bg-blue-900 hover:bg-blue-600 text-white">
                    Book Now
                  </button>
                )}
                <Link to={`/viewcardetails/${car._id}`}>
                  <button className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    
      {/* Pagination */}
      <ul className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredCars.length / carsPerPage) }, (_, i) => (
          <li
            key={i}
            className={`mx-1 cursor-pointer ${
              i + 1 === currentPage ? 'font-semibold text-blue-900' : 'text-gray-600'
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;

