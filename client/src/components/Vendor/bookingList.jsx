
// import React, { useEffect, useState } from "react";
// import axios from "../../axios";
// import { useSelector } from 'react-redux';

// const BookingList = () => {
//   const [booking, setBooking] = useState([]);
//   const vendor = useSelector(state => state.vendor);
//   const vendorId = vendor.details._id;

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get(`/vendor/bookinglist`, {
//         params: {
//           vendorId: vendorId
//         }
//       });
//       if (!response.data.err) {
//         setBooking(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [vendorId]);

//   const handleCancel = (bookingId) => {
//     // Handle cancel logic here
//     const response = axios.post('/vendor/cancelBooking',{
//       bookingId: bookingId,
//       message: "Your booking has been cancelled."
//     })
//     console.log(response.data); 
//     // Update the booking status to "Cancelled" in the state
//     const updatedBooking = booking.map((book) =>
//       book._id === bookingId ? { ...book, status: "Cancelled" } : book
//     );
//     setBooking(updatedBooking);
//   };

//   const isReturned = (dropoffDate) => {
//     const today = new Date();
//     const dropoff = new Date(dropoffDate);
//     return dropoff <= today;
//   };
//   const getStatus = (dropoffDate) => {
//     if (isReturned(dropoffDate)) {
//       return "Returned";
//     } else {
//       return "On Rent";
//     }
//   };

 

//   const handleMakeAvailable = (bookingId) => {
//     // Handle make available logic here
//     console.log(`Made booking with ID: ${bookingId} available`);
//   };


//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
//   };
  
//   return (
//     <div className="relative overflow-x-auto" style={{ paddingTop: '100px', paddingRight: '100px' }}>
//       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               No
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Booking Id
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Car Id
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Booking Date
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Pickup Date
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Dropoff Date
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Amount To Pay
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Payment Type
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Status
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Options
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {booking.map((book, index) => (
//             <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//               <td className="px-6 py-4">{index + 1}</td>
//               <td className="px-6 py-4">{book._id}</td>

//               <td className="px-6 py-4">{book.carId}</td>
//               <td className="px-6 py-4">{formatDate(book.bookingDate)}</td>
//               <td className="px-6 py-4">{formatDate(book.pickupDate)}</td>
//               <td className="px-6 py-4">{formatDate(book.dropoffDate)}</td>
//               <td className="px-6 py-4">{book.amountToPay}</td>
//               <td className="px-6 py-4">{book.paymentType}</td>
//               <td className="px-6 py-4">{getStatus(book.dropoffDate)}</td>
//               <td>
//               {book.status === "Cancelled" ? (
//                   <span className="text-red-500">Booking Cancelled</span>
//                 ) : isReturned(book.dropoffDate) ? (
//                   <button
//                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleMakeAvailable(book._id)}
//                   >
//                     Make Available
//                   </button>
//                 ) : (
//                   <button
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleCancel(book._id)}
//                   >
//                     Booking Cancel
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookingList;
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useSelector } from 'react-redux';

const BookingList = () => {
  const [booking, setBooking] = useState([]);
  const vendor = useSelector(state => state.vendor);
  const vendorId = vendor.details._id;
  const [availableBookings, setAvailableBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      const response = await axios.get(`/vendor/bookinglist`, {
        params: {
          vendorId: vendorId
        }
      });
      if (!response.data.err) {
        setBooking(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [vendorId]);

  const isReturned = (dropoffDate) => {
    const today = new Date();
    const dropoff = new Date(dropoffDate);
    return dropoff <= today;
  };

  const handleMakeAvailable = (bookingId) => {
    // Handle make available logic here
  let response= axios.patch(`/vendor/updateCarStatus/${bookingId}`, {
      isBooked: false
    });
    console.log(response);
    console.log(`Made booking with ID: ${bookingId} available`);
    setAvailableBookings([...availableBookings, bookingId]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };
  
  return (
    <div className="relative overflow-x-auto" style={{ paddingTop: '100px', paddingRight: '100px' }}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Booking Id
            </th>
            <th scope="col" className="px-6 py-3">
              Car Id
            </th>
            <th scope="col" className="px-6 py-3">
              Booking Date
            </th>
            <th scope="col" className="px-6 py-3">
              Pickup Date
            </th>
            <th scope="col" className="px-6 py-3">
              Dropoff Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount To Pay
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {booking.map((book, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{book._id}</td>
              <td className="px-6 py-4">{book.carId}</td>
              <td className="px-6 py-4">{formatDate(book.bookingDate)}</td>
              <td className="px-6 py-4">{formatDate(book.pickupDate)}</td>
              <td className="px-6 py-4">{formatDate(book.dropoffDate)}</td>
              <td className="px-6 py-4">{book.amountToPay}</td>
              <td className="px-6 py-4">{book.paymentType}</td>
              <td className="px-6 py-4">{isReturned(book.dropoffDate) ? 'Returned' : 'On Rent'}</td>
              <td>
              {isReturned(book.dropoffDate) && !availableBookings.includes(book._id) && (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleMakeAvailable(book._id)}
              >
                Make Available
              </button>
            )}
          </td>
        </tr>
      ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
