

// import React, { useState, useEffect } from 'react';
// import axios from '../../axios';
// import { useParams } from 'react-router-dom';

// const CarDetailsPage = () => {
//   const { id } = useParams();
//   const [car, setCar] = useState([]);

//   const fetchCar = async () => {
//     try {
//       const response = await axios.get(`/viewcardetails/${id}`);
//         if(!response.data.err){
//           setCar(response.data);
//         }
      
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCar();
//   }, []);

//   if (!car || !car.carImages || car.carImages.length === 0) {
//     return  
//   }
//   return (
//     <>
      
//         <div className="flex h-screen" key={car._id}>
//           {/* Left Side - Main Image */}
//           <div className="w-2/3 flex flex-col pt-20 pb-20 px-10">
              
//               <div className="h-2/3">
//                <img src={`http://localhost:5000/images/${car.carImages[0].filename}`} alt="Main Image" className="h-full w-full object-cover" /> 
//             </div>
//             <div className="h-1/3 flex mt-4">
//               <div className="w-1/4 pr-2">
//                <img src={`http://localhost:5000/images/${car.carImages[1].filename}`} alt="Main Image" className="h-full w-full object-cover" /> 
//               </div>
//               <div className="w-1/4 pr-2">
//               {/* <img src={`http://localhost:5000/images/${car.carImages[2].filename}`} alt="Main Image" className="h-full w-full object-cover" />  */}
//               </div>
//               <div className="w-1/4 pr-2">
//                 <img src alt="Subimage 3" className="w-full h-full object-cover" />
//               </div>
//               <div className="w-1/4">
//                 <img src alt="Subimage 4" className="w-full h-full object-cover" />
//               </div>
//             </div>
//              </div>
//           {/* Right Side - Car Details */}
//           <div className="w-1/3 flex items-center justify-center">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-4/5">
//               <h2 className="text-2xl font-bold mb-4">Car Details</h2>
//               <div className="text-center">
//                 <p>
//                   <strong>Car Model :</strong> {car.model}
//                 </p>
//                 <p>
//                   <strong>Year :</strong> {car.year}
//                 </p>
//                 <p>
//                   <strong>Mileage :</strong> {car.mileage} kmpl
//                 </p>
//                 <p>
//                   <strong>Fuel Type :</strong> {car.fuelType}
//                 </p>
//                 <p>
//                   <strong>Transmission Mode :</strong> {car.transmissionMode}
//                 </p>
//                 <p>
//                   <strong>Specification :</strong> {car.specifications}
//                 </p>
//                 <p>
//                   <strong>{car.rentPerDay} / Day</strong> 
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
    
//     </>
//   );
// };

// export default CarDetailsPage;

import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState([]);

  const fetchCar = async () => {
    try {
      const response = await axios.get(`/viewcardetails/${id}`);
      if (!response.data.err) {
        setCar(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  if (!car || !car.carImages || car.carImages.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex h-screen" key={car._id}>
        {/* Left Side - Main Image */}
        <div className="w-1/3 flex flex-col pt-20 pb-20 px-10">
          <Carousel
            showThumbs={false}
            showIndicators={false}
            dynamicHeight
            className="h-full"
            renderIndicator={() => null}
          >
            {car.carImages.map((image, index) => (
              <div key={index} className="h-full">
  <img
  src={`http://localhost:5000/images/${image.filename}`}
  alt={`Image ${index}`}
  className="h-100 w-100 object-cover"
/>


              </div>
            ))}
          </Carousel>
        </div>

        {/* Right Side - Car Details */}
        <div className="w-2/3 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-4/5">
            <h1 className="text-2xl font-bold mb-4 text-center">Car Details</h1>
            <div className="text-center">
              <p>
                <strong>Car Model:</strong> {car.model}
              </p>
              <p>
                <strong>Year:</strong> {car.year}
              </p>
              <p>
                <strong>Mileage:</strong> {car.mileage} kmpl
              </p>
              <p>
                <strong>Fuel Type:</strong> {car.fuelType}
              </p>
              <p>
                <strong>Transmission Mode:</strong> {car.transmissionMode}
              </p>
              <p>
                <strong>Specification:</strong> {car.specifications}
              </p>
              <p className='pb-3'>
                <strong>{car.rentPerDay} / Day</strong>
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetailsPage;
