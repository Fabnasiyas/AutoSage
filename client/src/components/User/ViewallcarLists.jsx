
import React, { useEffect, useState } from 'react';
import { FaCar, FaCog, FaGasPump } from 'react-icons/fa';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const Card = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCars = async () => {
    try {
      const response = await axios.get('/getallcarlist');
      if (!response.data.err) {
        setCars(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      car.fuelType.toLowerCase().includes(searchLower) ||
      car.specifications.toLowerCase().includes(searchLower) ||
      car.transmissionMode.toLowerCase().includes(searchLower) ||
      car.year.toString().includes(searchLower) 
    );
  });

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  return (
    <div className="text-center mb-10">
      {/* <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search by fuel type, specifications, or transmission mode"
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md mb-4"
        />
      </div> */}
      {/* <div className="flex justify-center mt-10 mb-10">
  <input
    type="text"
    placeholder="Search by fuel type, specifications, or transmission mode or year"
    value={searchTerm}
    onChange={handleSearchChange}
    className="px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    style={{ maxWidth: '400px', width: '100%' }}
  />
</div> */}
<div className="flex justify-center mt-10 mb-10 ">
  <input
    type="text"
    placeholder="Search by fuel type, specifications, or transmission mode or year"
    value={searchTerm}
    onChange={handleSearchChange}
    className="px-4 py-2 border   rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    style={{ maxWidth: '400px', width: '100%' }}
  />
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
                 <FaGasPump className="mx-1"  style={{ color: '#FDB221' }}/>
                 <p className="mt-1 text-sm">{car.mileage} kmpl</p>
               </div>
             </div>
             <div className="mt-4 flex ">
             <button className="px-4 py-1 bg-blue-900 hover:bg-blue-600 text-white">
 Book Now
</button>
<Link to={`/viewcardetails/${car._id}`}>
<button className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white" >
 View Details
</button>
</Link>

             </div>
           </div>
         </div>
        ))}
      </div>
      
      <div className="pagination flex justify-center mt-4">
  {pageNumbers.map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={`pagination-button px-2 py-1 mx-1 rounded ${
        currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-white text-gray-800"
      }`}
    >
      {pageNumber}
    </button>
  ))}
</div>
      <div className="pagination flex justify-center mt-4">
        {/* Pagination buttons */}
        {/* ... */}
      </div>
      <div className="mt-4">
        <Link to="/allcarsPage">
          <p className="text-blue-900"></p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
