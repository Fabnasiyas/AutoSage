import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faPlaneDeparture, faMapMarkerAlt, faMapMarkedAlt, faCar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const DivContainer = () => {
  return (
    <div className="container mx-auto px-4 mt-20 mb-20">
      <h1 className="text-3xl font-semibold text-center mt-10 mb-10 text-blue-900">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className=" p-4 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faCity} style={{ color: 'FDB221' }} />
          <h2 className="text-lg font-semibold text-blue-900 mt-1 mb-2">Whole City Tour</h2>
          <p className='text-gray-500'>Discover the city like never before and Experience the best of city with Us</p>
        </div>
        <div className=" p-4 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: 'FDB221' }} />
          <h2 className="text-lg font-semibold text-blue-900 mt-1 mb-2">Airport Transfer</h2>
          <p className='text-gray-500'>Safe and reliable airport transfer. Book now and enjoy your ride</p>
        </div>
        <div className=" p-4 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'FDB221' }} />
          <h2 className="text-lg font-semibold text-blue-900 mb-2 mt-1">City Transfer</h2>
          <p className='text-gray-500'>Quick, Hassle-free rides between city destinations. Book now for a comfortable ride.</p>
        </div>
        <div className=" p-4 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faMapMarkedAlt} style={{ color: 'FDB221' }} />
          <h2 className="text-lg font-semibold text-blue-900 mb-2 mt-1">Many Pickup Locations</h2>
          <p className='text-gray-500'>Multiple pickup locations to choose from, including hotels, airports, and more. Book Now</p>
        </div>
        <div className=" p-4 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'FDB221' }} />
          <h2 className="text-lg font-semibold text-blue-900 mb-2 mt-1">Fast & Easy Booking</h2>
          <p className='text-gray-500'>Book your ride in minutes with an easy-to-use booking system and convenient.</p>
        </div>
        <div className=" p-4 shadow-md rounded-lg">
          <FontAwesomeIcon icon={faCar} style={{ color: 'FDB221' }} />
          <h2 className="text-lg font-semibold text-blue-900 mb-2 mt-1">Unlimited Miles Car Rental</h2>
          <p className='text-gray-500'>No limits on mileage. Experience it with ease and flexibility. Book Now</p>
        </div>
      </div>
    </div>
  );
};

export default DivContainer;
