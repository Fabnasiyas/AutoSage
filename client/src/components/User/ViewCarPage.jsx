
// // import React, { useState } from 'react';
// // // import img from '../src/assets/carrr.jpg'
// // import Image1 from '../src/assets/car3.webp';
// // import Image2 from '../src/assets/car2.jpeg';
// // import Image3 from '../src/assets/white.png';
// // const ProductPage = () => {
// //   const [images, setImages] = useState({
// //     img1: Image1,
// //     img2: Image2,
// //     img3: Image3,
// //     // img4: img,
// //   });


// //   const [activeImg, setActiveImage] = useState(images.img1);
// //   const [amount, setAmount] = useState(1);

// //   const handleDecreaseAmount = () => {
// //     if (amount > 1) {
// //       setAmount((prev) => prev - 1);
// //     }
// //   };

// //   const handleIncreaseAmount = () => {
// //     setAmount((prev) => prev + 1);
// //   };

// //   return (
// //     <div className='flex flex-col lg:flex-row h-screen items-center justify-center gap-16 lg:items-center mx-10'>
// //       {/* Left Side - Carousel */}
// //       <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>
// //         <img
// //           src={activeImg}
// //           alt=""
// //           className='w-full h-auto aspect-square object-cover rounded-xl shadow-lg'
// //         />
// //         <div className='flex flex-row justify-between mt-6'>
// //           {Object.values(images).map((image, index) => (
// //             <img
// //               key={index}
// //               src={image}
// //               alt={`Image ${index}`}
// //               className={`w-16 h-16 mx-2 rounded-md cursor-pointer ${activeImg === image ? 'border-2 border-violet-600' : ''}`}
// //               onClick={() => setActiveImage(image)}
// //             />
// //           ))}
// //         </div>
// //       </div>

// //       {/* Right Side - Product Details */}
// //       <div className='w-full lg:w-1/2 flex flex-col gap-4 items-center lg:items-start'>
// //         <div>
// //           <span className='text-violet-600 font-semibold'>Special Sneaker</span>
// //           <h1 className='text-3xl font-bold'>Nike Invincible 3</h1>
// //         </div>
// //         <p className='text-gray-700'>
// //           Con un'ammortizzazione incredibile per sostenerti in tutti i 
// //         </p>
        
// //         <h6 className='text-2xl font-semibold'>$ 199.00</h6>
// //         <div className='flex flex-row items-center gap-12'>
// //           <div className='flex flex-row items-center'>
// //             <button
// //               className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl'
// //               onClick={handleDecreaseAmount}
// //             >
// //               -
// //             </button>
// //             <span className='py-4 px-6 rounded-lg'>{amount}</span>
// //             <button
// //               className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl'
// //               onClick={handleIncreaseAmount}
// //             >
// //               +
// //             </button>
// //           </div>
// //           <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductPage;

// import React, { useState, useEffect } from 'react';
// import axios from '../../axios';
// import { useParams } from 'react-router-dom';

// const ProductPage = () => {
//   const { id } = useParams();
//   const [carData, setCarData] = useState(null);
//   const [activeImg, setActiveImage] = useState(null);
  
//   useEffect(() => {
//     // Fetch images from the API
//     axios.get(`/viewcar/${id}`)
//       .then(response => {
//         console.log('====================================');
//         console.log(response.data);
//         console.log('====================================');
//         setCarData(response.data.car);
//         setActiveImage(response.data.car.carImages[0]); // Set the first car image as active by default
     
//       })
//       .catch(error => {
//         console.error('Error fetching images:', error);
//       });
//   }, []);

//   const handleImageClick = (image) => {
//     setActiveImage(image);
//   };


//   return (
//     <div className='flex flex-col lg:flex-row h-screen items-center justify-center gap-16 lg:items-center mx-10'>
//       {/* Left Side - Carousel */}
//        {/* Left Side - Carousel */}
//        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>
//         {activeImg && (
//           <img
//             src={activeImg.url} // Assuming the image object has a "url" field with the image URL
//             alt={`Car Image ${activeImg.id}`}
//             className='w-full h-auto aspect-square object-cover rounded-xl shadow-lg'
//           />
//         )}
//         <div className='flex flex-row justify-between mt-6'>
//           {carData &&
//             carData.carImages.map(image => (
//               <img
//                 key={image._id} // Assuming the image object has an "_id" field for uniqueness
//                 src={image.url} // Assuming the image object has a "url" field with the image URL
//                 alt={`Car Image ${image._id}`}
//                 className={`w-16 h-16 mx-2 rounded-md cursor-pointer ${activeImg === image ? 'border-2 border-violet-600' : ''}`}
//                 onClick={() => setActiveImage(image)}
//               />
//             ))}
//         </div>
//       </div>
// {/* <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>
//         {carData && (
//           carData.carImages.map((image, index) => (
//             <div
//               key={index}
//               className={`image-container flex items-center justify-center border border-gray-300 rounded-xl h-80 ${
//                 activeImg === image ? 'border-violet-600' : ''
//               }`}
//               onClick={() => handleImageClick(image)}
//             >
//               <img
//                 src={`http://localhost:5000/images/${image.filename}`} // Assuming "filename" contains the image filename in the server
//                 alt={`Image ${index}`}
//                 className="h-full w-full object-cover rounded-xl"
//                 style={{ objectFit: 'cover' }}
//               />
//             </div>
//           ))
//         )}
//       </div> */}
//       {/* Right Side - Product Details */}
//       <div className='w-full lg:w-1/2 flex flex-col gap-4 items-center lg:items-start'>
//         <h1>sdfgh</h1>
//         {carData && (
//           <div>
//             <span className='text-violet-600 font-semibold'>{carData.title}</span>
//             <h1 className='text-3xl font-bold'>{carData.name}</h1>
//           </div>
//         )}
//         {carData && (
//           <p className='text-gray-700'>
//             {carData.description}
//           </p>
//         )}
//         {carData && (
//           <h6 className='text-2xl font-semibold'>{`$ ${carData.price}`}</h6>
//         )}
//         {/* Rest of the car details */}
//         {/* ... */}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useParams } from 'react-router-dom';
const ProductPage = () => {
  const [carData, setCarData] = useState(null);
  const [activeImg, setActiveImage] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // Fetch car data from the API
    const res=axios.get(`/viewcar/${id}`)
      .then(response => {
        setCarData(response.data.car);
        setActiveImage(response.data.car.carImages[0]); // Set the first car image as active by default
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  

  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  return (
    <div className='flex flex-col lg:flex-row h-screen items-center justify-center gap-16 lg:items-center mx-10'>
      {/* Left Side - Carousel */}
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center mx-10'>
        {activeImg && (
          <img
          src={`http://localhost:5000/images/${activeImg.filename}`}  // Assuming the image object has a "url" field with the image URL
            alt={`Car Image ${activeImg.id}`}
            className='w-full h-auto aspect-square object-cover rounded-xl shadow-lg'
          />
        )}
        <div className='flex flex-row justify-between mt-6'>
          {carData &&
            carData.carImages.map((image, index) => (
              <div
                key={index}
                className={`image-container cursor-pointer ${activeImg === image ? 'border-2 border-violet-600' : 'border border-gray-300'} rounded-md h-16 w-16 mx-2`}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={`http://localhost:5000/images/${image.filename}`} // Assuming the image object has a "url" field with the image URL
                  alt={`Car Image ${image._id}`}
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
            ))}
        </div>
      </div>

      {/* Right Side - Car Details */}
      <div className='w-full lg:w-1/2 flex flex-col gap-4 items-center lg:items-start'>
      <h1 className='font-bold text-4xl'>Car Details</h1>
        {carData && (
          <>
            <h1 className='text-2xl font-semibold'>Model: {carData.model}</h1>
            <h2 className='text-lg'>Year: {carData.year}</h2>
            <h2 className='text-lg'>Mileage: {carData.mileage} kmpl</h2>
            <h2 className='text-lg'>Fuel Type: {carData.fuelType}</h2>
            <h2 className='text-lg'>Transmission Mode: {carData.transmissionMode}</h2>
            <h2 className='text-lg'>Specification: {carData.specifications}</h2>
            <h2 className='text-lg'>Rent Per Day:  &#8377; {carData.rentPerDay}</h2>
            <h2 className='text-lg'>Location: {carData.location}</h2>
            <h1></h1>
            <button class="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600">
    Book Now
  </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
