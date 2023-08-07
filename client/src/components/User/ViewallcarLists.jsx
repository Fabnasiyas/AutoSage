
import React, { useEffect, useState } from 'react';
import { FaCar, FaCog, FaGasPump } from 'react-icons/fa';
import axios from '../../axios';

import { Link } from 'react-router-dom';
import mapboxAPI from '../../mapbox/mapboxApi';
const Card = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(12);
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedSpecifications, setSelectedSpecifications] = useState('');
  const [selectedTransmissionMode, setSelectedTransmissionMode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedLatitude, setSearchedLatitude] = useState();
  const [searchedLongitude, setSearchedLongitude] = useState();
  const [noCarsFoundMessage, setNoCarsFoundMessage] = useState(false);
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };



  const handleSearch = async () => {
    try {
      console.log(searchQuery);
      if (!searchQuery) {
        console.log('no query');
        setFilteredCars(cars);
        return;
      }

      // Geocode the typed location using Mapbox Geocoding API
      console.log('jdfksjfksd');
      const response = await mapboxAPI.get(`/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`);

      if (response.data.features.length === 0) {
        console.log('Location not found');
        return;
      }

      const points = response.data.features[1];
      console.log(parseFloat(points.center[1]));
      const latitude = parseFloat(points.center[1]);
      const longitude = parseFloat(points.center[0]);

      setSearchedLatitude(latitude);
      setSearchedLongitude(longitude);

      const searchedLocation = { latitude: searchedLatitude, longitude: searchedLongitude };
      console.log(searchedLocation, 'searched Location');

      // Filter cars based on distance
      const filteredCarsByDistance = cars.filter((car) => {
        const coordinates = JSON.parse(car.coordinates);
        console.log('Coordinates:', coordinates);
        if (!Array.isArray(coordinates) || coordinates.length !== 2) {
          console.log('Invalid coordinates:', coordinates);
          return false;
        }

        const [longitude, latitude] = coordinates;
        const carLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

        function calculateDistance(lat1, lon1, lat2, lon2) {
          const R = 6371; // Earth's radius in km
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return distance;
        }

        const distance = calculateDistance(
          searchedLocation.latitude,
          searchedLocation.longitude,
          carLocation.latitude,
          carLocation.longitude
        );
        console.log(distance);
        const within10Km = distance <= 10;
        console.log(within10Km, 'within 10 km');

        return within10Km; 
      });

      console.log('==============filteredCarsByDistance======================');
      console.log(filteredCarsByDistance);
      setFilteredCars(filteredCarsByDistance);
      if (filteredCarsByDistance.length === 0) {
        // If no cars found, display a message
        setNoCarsFoundMessage(true);
      } else {
        setNoCarsFoundMessage(false);
      }
    } catch (error) {
      console.log('Error geocoding the typed location:', error);
    }
  };



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

  useEffect(() => {

    applyFilters();
  }, [selectedFuelType, selectedSpecifications, selectedTransmissionMode]);



  const applyFilters = () => {



    const filteredCars = cars.filter((car) => {

      if (car.specifications.includes(selectedSpecifications)) {

      }


      const fuelTypeMatch = !selectedFuelType || car.fuelType.toLowerCase().includes(selectedFuelType.toLowerCase());


      const specificationsMatch = !selectedSpecifications || car.specifications.toLowerCase().includes(selectedSpecifications.toLowerCase());


      const transmissionModeMatch = !selectedTransmissionMode || car.transmissionMode.toLowerCase().includes(selectedTransmissionMode.toLowerCase());


      return fuelTypeMatch && specificationsMatch && transmissionModeMatch;
    });




    setFilteredCars(filteredCars);

    if (filteredCars.length === 0) {
      // If no cars found, display a message
      setNoCarsFoundMessage(true);
    } else {
      setNoCarsFoundMessage(false);
    }
    setCurrentPage(1);
  };




  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl font-semibold mt-6 mb-10 text-blue-900"></h1>
      <div className="flex items-center justify-center mt-5">
        <input
          type="text"
          placeholder="Search using Location"
          value={searchQuery}
          onChange={handleInputChange}
          className="h-12 px-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none w-96"
        />
        <button
          onClick={handleSearch} // Call the handleSearch function when the button is clicked
          className="h-12 px-4 ml-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
        >
          Search
        </button>
      </div>
      <div className="max-w-xl mx-auto mb-5 mt-3">

        <select
          className="mt-2 mr-4 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedFuelType}
          onChange={(e) => setSelectedFuelType(e.target.value)}
        >
          <option value="">All Fuel Types</option>
          <option value="petrol">Petrol</option>
          <option value="diesal">Diesel</option>
          <option value="electric">Electric</option>

        </select>


        <select
          className="mt-2 mr-4 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedSpecifications}
          onChange={(e) => setSelectedSpecifications(e.target.value)}
        >
          <option value="">All Specifications</option>
          <option value="basemodel">Base Model</option>
          <option value="semioption">Semi Option</option>
          <option value="fulloption">Full Option</option>


        </select>


        <select
          className="mt-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedTransmissionMode}
          onChange={(e) => setSelectedTransmissionMode(e.target.value)}
        >
          <option value="">All Transmission Modes</option>
          <option value="automatic">Automatic</option>
          <option value="mannual">Manual</option>


        </select>

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
                  <Link to={`/booking/${car._id}`}>
                    <button className="px-4 py-1 bg-blue-900 hover:bg-blue-600 text-white">
                      Book Now
                    </button></Link>
                )}
                <Link to={`/viewcar/${car._id}`}>
                  <button className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='pt-20'>

        {noCarsFoundMessage && <p className='text-red-500' >No cars found....</p>}
      </div>
      <ul className="flex justify-center mt-2">
        {Array.from({ length: Math.ceil(filteredCars.length / carsPerPage) }, (_, i) => (
          <li
            key={i}
            className={`mx-1 cursor-pointer ${i + 1 === currentPage ? 'font-semibold text-blue-900' : 'text-gray-600'
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
