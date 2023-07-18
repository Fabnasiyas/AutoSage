
// import { useSelector } from 'react-redux';
// import React, { useState, useEffect } from 'react';
// import axios from '../../axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Modal from 'react-modal';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// const CarDetailsPage = () => {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const [pickupDate, setPickupDate] = useState(null);
//   const [dropoffDate, setDropoffDate] = useState(null);
//   const navigate = useNavigate();
//   const [checkout, setCheckout] = useState(false);
//   const [bookingData, setBookingData] = useState(null);
//   const [showProceedMessage, setShowProceedMessage] = useState(false);
//   const [paymentSelection, setPaymentSelection] = useState(null);
//   const user = useSelector(state => state.user.details);
//   const userId = user ? user._id : null;

//   const fetchCar = async () => {
//     try {
//       const response = await axios.get(`/viewcardetails/${id}`);
//       if (!response.data.err) {
//         setCar(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCar();
//   }, []);

//   const handlePickupDateChange = (date) => {
//     setPickupDate(date);
//   };

//   const handleDropoffDateChange = (date) => {
//     setDropoffDate(date);
//   };

//   const handleProceed = () => {
//     if (pickupDate && dropoffDate) {
//       const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
//       const totalDays = Math.round(Math.abs((dropoffDate - pickupDate) / oneDay));

//       if (totalDays === 0) {
//         setShowProceedMessage(true);
//       } else {
//         setShowProceedMessage(false);
//         setPaymentSelection('Advance');
//       }
//     } else {
//       setShowProceedMessage(true);
//     }
//   };

//   const handleBookAdvancePayment = () => {
//     if (userId) {
//       if (pickupDate && dropoffDate) {
//         const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
//         const totalDays = Math.round(Math.abs((dropoffDate - pickupDate) / oneDay));
//         const totalAmount=totalDays * car.rentPerDay 
//         const amountToPay =(totalAmount) / 2;
//         const balance=totalAmount-amountToPay;

//         const bookingData = {
//           userId: userId,
//           vendorId: car.vendorId,
//           carId: car._id,
//           pickupDate,
//           dropoffDate,
//           bookingDate: new Date(),
//           amountToPay,
//           totalAmount,
//           balance,
//           paymentType:'Advance Payment'


//         };
//         setBookingData(bookingData);
//         setPaymentSelection(null);
//         setCheckout(true);
//       } else {
//         alert('Please select both pickup and drop-off dates');
//       }
//     } else {
//       navigate('/login');
//     }
//   };

//   const handleBookFullPayment = () => {
//     if (pickupDate && dropoffDate) {
//       const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
//       const totalDays = Math.round(Math.abs((dropoffDate - pickupDate) / oneDay));
//       const totalAmount=totalDays * car.rentPerDay
//       const amountToPay = totalAmount;
//       const balance=totalAmount-amountToPay;

//       const bookingData = {
//         userId: userId,
//         vendorId: car.vendorId,
//         carId: car._id,
//         pickupDate,
//         dropoffDate,
//         bookingDate: new Date(),
//         amountToPay,
//         totalAmount,
//         balance,
//         paymentType:'Full Payment'
//       };
//       setBookingData(bookingData);
//       setPaymentSelection(null);
//       setCheckout(true);
//     } else {
//       alert('Please select both pickup and drop-off dates');
//     }
//   };

//   const closeModal = () => {
//     setCheckout(false);
//   };

//   if (!car || !car.carImages || car.carImages.length === 0) {
//     return null;
//   }

//   if (paymentSelection) {
//     return (
//       <Modal
//         isOpen={true}
//         onRequestClose={() => setPaymentSelection(null)}
//         contentLabel="Payment Selection"
//         className="fixed inset-0 flex items-center justify-center z-50"
//         overlayClassName="fixed inset-0 bg-black opacity-50"
//       >
//         <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
//           <h2 className="text-2xl font-bold mb-6 text-center">Payment Selection</h2>
//           <div className="flex justify-center">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded mr-2"
//               onClick={handleBookAdvancePayment}
//             >
//               Advance Payment
//             </button>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded"
//               onClick={handleBookFullPayment}
//             >
//               Full Payment
//             </button>
//           </div>
//         </div>
//       </Modal>
//     );
//   }

//   return (
//     <>
//       <div className="flex h-screen" key={car._id}>
//         {/* Left Side - Main Image */}
//         <div className="w-1/3 flex flex-col pt-20 pb-20 px-10">
//           <Carousel
//             showThumbs={false}
//             showIndicators={false}
//             dynamicHeight
//             className="h-full"
//             renderIndicator={() => null}
//           >
//             {car.carImages.map((image, index) => (
//               <div key={index} className="h-full">
//                 <img
//                   src={`http://localhost:5000/images/${image.filename}`}
//                   alt={`Image ${index}`}
//                   className="max-w-200"
//                 />
//               </div>
//             ))}
//           </Carousel>
//         </div>

//         {/* Right Side - Car Details */}
//         <div className="w-2/3 flex items-center justify-center">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-4/5">
//             <h1 className="text-2xl font-bold mb-4 text-center">Car Details</h1>
//             <div className="text-center">
//               <p>
//                 <strong>Car Model:</strong> {car.model}
//               </p>
//               <p>
//                 <strong>Year:</strong> {car.year}
//               </p>
//               <p>
//                 <strong>Mileage:</strong> {car.mileage} kmpl
//               </p>
//               <p>
//                 <strong>Fuel Type:</strong> {car.fuelType}
//               </p>
//               <p>
//                 <strong>Transmission Mode:</strong> {car.transmissionMode}
//               </p>
//               <p>
//                 <strong>Specification:</strong> {car.specifications}
//               </p>
//               <p className="pb-3">
//                 <strong>{car.rentPerDay} / Day</strong>
//               </p>
//             {car.isBooked ? (
//               <div className="flex justify-center">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded"

//               >
//                 booked
//               </button>
//             </div>


// ):(
//   <div className="flex justify-center mb-8">
//                 <div className="mr-4">
//                   <DatePicker
//                     selected={pickupDate}
//                     onChange={handlePickupDateChange}
//                     placeholderText="Pickup Date"
//                     className="w-40 px-4 py-2 rounded border border-gray-300 text-sm"
//                   />
//                 </div>
//                 <div className="ml-2">
//                   <DatePicker
//                     selected={dropoffDate}
//                     onChange={handleDropoffDateChange}
//                     placeholderText="Drop-off Date"
//                     className="w-40 px-4 py-2 rounded border border-gray-300 text-sm"
//                   />
//                 </div>
//               </div>

//               {showProceedMessage && (
//                 <p className="text-red-500">Please select both pickup and drop-off dates.</p>
//               )}

//               <div className="flex justify-center">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded"
//                   onClick={handleProceed}
//                 >
//                   Proceed
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PayPal Payment Modal */}
//       <Modal
//         isOpen={checkout}
//         onRequestClose={closeModal}
//         contentLabel="PayPal Payment"
//         className="fixed inset-0 flex items-center justify-center z-50"
//         overlayClassName="fixed inset-0 bg-black opacity-50"
//       >
//         <div style={{ width: '500px' }} className="bg-white rounded-lg p-8 max-w-md mx-auto">
//           <h2 className="text-2xl font-bold mb-6 text-center">PayPal Payment</h2>
//           <PayPalScriptProvider
//             options={{
//               "client-id": "Abhp9DIDpqLlpmwjLxCUOBJhsJPefegAgL7aTXjA8Q6CBkR5oV4IeeRI4EpMXjdRjPmdWDWMmgK0T0m2",
//             }}
//           >
//             <PayPalButtons
//               createOrder={(data, actions) => {
//                 return actions.order.create({
//                   purchase_units: [{ amount: { value: bookingData.amountToPay } }],
//                 });
//               }}
//               onApprove={async (data, actions) => {
//                 await actions.order.capture();

//                 closeModal();

//                 // Send booking data to the server
//                 axios
//                   .post('/bookings', bookingData)
//                   .then((response) => {
//                     console.log('Booking by advance payment:', pickupDate, dropoffDate);
//                     console.log('Booking details:', response.data);
//                   })
//                   .catch((error) => {
//                     console.error('Error booking:', error);
//                   });

//                 navigate('/success');
//               }}
//               onCancel={() => {
//                 closeModal();
//               }}
//               onError={() => {
//                 navigate('/payment-failure');
//                 closeModal();
//               }}
//             />
//           </PayPalScriptProvider>
//           <button
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full"
//             onClick={closeModal}
//           >
//             Close
//           </button>
//         </div>
//       </Modal>)}
//     </>
//   );
// };

// export default CarDetailsPage;

import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [showProceedMessage, setShowProceedMessage] = useState(false);
  const [paymentSelection, setPaymentSelection] = useState(null);
  const user = useSelector(state => state.user.details);
  const userId = user ? user._id : null;

  const doc = user && Array.isArray(user.drivingLicense) && Array.isArray(user.aadharCard)
    ? [...user.drivingLicense, ...user.aadharCard]
    : null;
  


  const [dropoffDateAvailable, setDropoffDateAvailable] = useState(null); // New state variable
  const fetchCar = async () => {
    try {
      const response = await axios.get(`/viewcardetails/${id}`);
      if (!response.data.err) {
        setCar(response.data.car);
        const booking = response.data.books;
        if (booking) {
          const { dropoffDate } = booking;
          const options = { day: '2-digit', month: 'long', year: 'numeric' };
          const formattedDropoffDate = new Date(dropoffDate).toLocaleDateString('en-GB', options);
          setDropoffDateAvailable(formattedDropoffDate);
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
  };

  const handleDropoffDateChange = (date) => {
    setDropoffDate(date);
  };

  const handleProceed = () => {
    if (pickupDate && dropoffDate) {
      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
      const totalDays = Math.round(Math.abs((dropoffDate - pickupDate) / oneDay));

      if (totalDays === 0) {
        setShowProceedMessage(true);
      } else {
        setShowProceedMessage(false);
        setPaymentSelection('Advance');
      }
    } else {
      setShowProceedMessage(true);
    }
  };

  const handleBookAdvancePayment = () => {
    if (userId) {
      if (pickupDate && dropoffDate) {
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
        const totalDays = Math.round(Math.abs((dropoffDate - pickupDate) / oneDay));
        const totalAmount = totalDays * car.rentPerDay;
        const amountToPay = totalAmount / 2;
        const balance = totalAmount - amountToPay;

        const bookingData = {
          userId: userId,
          vendorId: car.vendorId,
          carId: car._id,
          pickupDate,
          dropoffDate,
          bookingDate: new Date(),
          amountToPay,
          totalAmount,
          balance,
          paymentType: 'Advance Payment'
        };
        setBookingData(bookingData);
        setPaymentSelection(null);
        setCheckout(true);
      } else {
        alert('Please select both pickup and drop-off dates');
      }
    } else {
      navigate('/login');
    }
  };
  const currentDate = new Date();
  const handleBookFullPayment = () => {
    if (pickupDate && dropoffDate) {
      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
      const totalDays = Math.round(Math.abs((dropoffDate - pickupDate) / oneDay));
      const totalAmount = totalDays * car.rentPerDay;
      const amountToPay = totalAmount;
      const balance = totalAmount - amountToPay;

      const bookingData = {
        userId: userId,
        vendorId: car.vendorId,
        carId: car._id,
        pickupDate,
        dropoffDate,
        bookingDate: new Date(),
        amountToPay,
        totalAmount,
        balance,
        paymentType: 'Full Payment'
      };
      setBookingData(bookingData);
      setPaymentSelection(null);
      setCheckout(true);
    } else {
      alert('Please select both pickup and drop-off dates');
    }
  };

  const closeModal = () => {
    setCheckout(false);
  };

  if (!car || !car.carImages || car.carImages.length === 0) {
    return null;
  }

  if (paymentSelection) {
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => setPaymentSelection(null)}
        contentLabel="Payment Selection"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black opacity-50"
      >
        <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Payment Selection</h2>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded mr-2"
              onClick={handleBookAdvancePayment}
            >
              Advance Payment
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded"
              onClick={handleBookFullPayment}
            >
              Full Payment
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="flex h-screen" key={car._id}>
        {/* Left Side - Main Image */}
{/*  
<div className="w-1/3 flex flex-col pt-20 pb-20 px-10">
  <div className="h-100 w-full">
    <Carousel className="rounded-xl">
      {car.carImages.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:5000/images/${image.filename}`}
          alt={`Image ${index}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  </div>
</div> */}
<div className="w-1/3 flex flex-col items-center justify-center ml-4 pb-20 px-10">
<h1 className="text-2xl font-bold mb-8 text-center">{car.model}</h1>
  
  <div className="h-100 w-full ">
    <Carousel className="rounded-xl">
      {car.carImages.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:5000/images/${image.filename}`}
          alt={`Image ${index}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  </div>
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
                <strong>Location:</strong> {car.location}
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
              <p className="pb-3">
                <strong>{car.rentPerDay} / Day</strong>
              </p>
              {car.isBooked ? (
                dropoffDateAvailable ? (
                  <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded">
                      Already Booked, Available After {dropoffDateAvailable}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded">
                      Booked
                    </button>
                  </div>
                )
              ) : (
                <>
                  <div className="flex justify-center mb-8">
                    <div className="mr-4">
                      <DatePicker
                        selected={pickupDate}
                        onChange={handlePickupDateChange}
                        placeholderText="Pickup Date"
                        minDate={currentDate}
                        className="w-40 px-4 py-2 rounded border border-gray-300 text-sm"
                      />
                    </div>
                    <div className="ml-2">
                      <DatePicker
                        selected={dropoffDate}
                        onChange={handleDropoffDateChange}
                        placeholderText="Drop-off Date"
                        minDate={pickupDate ? new Date(pickupDate.getTime() + 24 * 60 * 60 * 1000) : null}
                        className="w-40 px-4 py-2 rounded border border-gray-300 text-sm"
                      />
                    </div>
                  </div>


                  {showProceedMessage && (
                    <p className="text-red-500">Please select both pickup and drop-off dates.</p>
                  )}
                  {userId ? (
                    doc && doc.length > 0 ? ( // Check if doc exists and is not an empty array
                      <div className="flex justify-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded"
                          onClick={handleProceed}
                        >
                          Proceed
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-500 mb-4">
                          Please add your driving license and Aadhaar card before proceeding.
                        </p>

                        <Link to={`/adddocuments`}>
                          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add Document</button>
                        </Link>


                      </div>
                    )
                  ) : (
                    <Link to="/login">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded">
                        Please Login To Book The Car
                      </button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PayPal Payment Modal */}
      <Modal
        isOpen={checkout}
        onRequestClose={closeModal}
        contentLabel="PayPal Payment"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black opacity-50"
      >
        <div style={{ width: '500px' }} className="bg-white rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">PayPal Payment</h2>
          {bookingData && (
            <>
              <p className="text-center mb-3">
                Payment Amount: {'\u20B9'}
                {bookingData.amountToPay}
              </p>

              <PayPalScriptProvider
                options={{
                  'client-id': 'Abhp9DIDpqLlpmwjLxCUOBJhsJPefegAgL7aTXjA8Q6CBkR5oV4IeeRI4EpMXjdRjPmdWDWMmgK0T0m2',
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { value: bookingData.amountToPay } }],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    await actions.order.capture();

                    closeModal();

                    // Send booking data to the server
                    axios
                      .post('/bookings', bookingData)
                      .then((response) => {
                        console.log('Booking by advance payment:', pickupDate, dropoffDate);
                        console.log('Booking details:', response.data);
                      })
                      .catch((error) => {
                        console.error('Error booking:', error);
                      });

                    navigate('/success');
                  }}
                  onCancel={() => {
                    closeModal();
                  }}
                  onError={() => {
                    navigate('/payment-failure');
                    closeModal();
                  }}
                />
              </PayPalScriptProvider>
            </>
          )}
        
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CarDetailsPage;
<>
  {/* <p className="text-center">Amount to Pay: {bookingData.amountToPay}</p>
          <PayPalScriptProvider
            options={{
              'client-id': 'Abhp9DIDpqLlpmwjLxCUOBJhsJPefegAgL7aTXjA8Q6CBkR5oV4IeeRI4EpMXjdRjPmdWDWMmgK0T0m2',
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: bookingData.amountToPay } }],
                });
              }}
              onApprove={async (data, actions) => {
                await actions.order.capture();

                closeModal();

                // Send booking data to the server
                axios
                  .post('/bookings', bookingData)
                  .then((response) => {
                    console.log('Booking by advance payment:', pickupDate, dropoffDate);
                    console.log('Booking details:', response.data);
                  })
                  .catch((error) => {
                    console.error('Error booking:', error);
                  });

                navigate('/success');
              }}
              onCancel={() => {
                closeModal();
              }}
              onError={() => {
                navigate('/payment-failure');
                closeModal();
              }}
            />
          </PayPalScriptProvider> */}</>