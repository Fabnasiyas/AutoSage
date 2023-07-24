
// import React, { useEffect, useState } from 'react';
// import { FaCar, FaCog, FaGasPump } from 'react-icons/fa';
// import axios from '../../axios';
// import { Link } from 'react-router-dom';

// const Card = () => {
//   const [cars, setCars] = useState([]);
//   const fetchCars = async () => {
//     try {
//       const response = await axios.get('/getcars');
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
  
//   return (
//     <div className="text-center mb-10">
//       <h1 className="text-3xl font-semibold mt-10 mb-10 text-blue-900">Our  Cars</h1>
//       <div className="flex flex-wrap justify-center mt-6">
//         {cars.map((car, index) => (
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
//                 <FaCar className="mr-1" style={{ color: '#FDB221' }} />

//                   <p className="mt-1 text-sm">Model-{car.year}</p>
//                 </div>
//                 <div className="flex items-center mr-2">
//                   <FaCog className="mx-1" style={{ color: '#FDB221' }} />
//                   <p className="mt-1 text-sm">{car.specifications}</p>
//                 </div>
//                 <div className="flex items-center">
//                   <FaGasPump className="mx-1"  style={{ color: '#FDB221' }}/>
//                   <p className="mt-1 text-sm">{car.mileage} kmpl</p>
//                 </div>
//               </div>
//               <div className="mt-4 flex ">
//               <button className="px-4 py-1 bg-blue-900 hover:bg-blue-600 text-white">
//   Book Now
// </button>
// <Link to={`/viewcardetails/${car._id}`}>
// <button className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white" >
//   View Details
// </button>
// </Link>

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-4">
//         <Link to="/allcarsPage">
//          <p className='text-blue-900'>View more...</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React, { useEffect, useState } from 'react';
import { FaCar, FaCog, FaGasPump } from 'react-icons/fa';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const Card = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get('/getcars');
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

  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl font-semibold mt-10 mb-10 text-blue-900">Our  Cars</h1>
      <div className="flex flex-wrap justify-center mt-6">
        {cars.map((car, index) => (
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
                    </button>
                  </Link>
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
      <div className="mt-4">
        <Link to="/allcarsPage">
          <p className='text-blue-900'>View more...</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
