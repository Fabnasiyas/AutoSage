
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import axios from '../../axios';

// const ProfilePage = () => {
//   const user = useSelector(state => state.user.details);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get('/userbookings', {
//         params: {
//           userId: user._id
//         }
//       });
//       setBookings(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     user ? (
//       <div className="flex min-h-screen mt-2">
//         <div className="lg:w-1/3 p-8 bg-gray-100 flex flex-col justify-center">
//           <div className="text-center">
//             {/* User details */}
//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <Link to="/adddocuments">
//               <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add Document</button>
//             </Link>
//             <Link to="/edituserProfile">
//               <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md ml-2">Edit</button>
//             </Link>
//           </div>
//         </div>
//         <div className="w-full lg:w-2/3 p-8">
//           <h2 className="text-2xl font-bold">My Bookings</h2>
//           <table className="w-full mt-4">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 bg-gray-200">CarId</th>
//                 <th className="px-4 py-2 bg-gray-200">BookingId</th>
//                 <th className="px-4 py-2 bg-gray-200">Booking Date</th>
//                 <th className="px-4 py-2 bg-gray-200">Pickup Date</th>
//                 <th className="px-4 py-2 bg-gray-200">Dropoff Date</th>
//                 <th className="px-4 py-2 bg-gray-200">Total Amount</th>
//                 <th className="px-4 py-2 bg-gray-200">Type of Payment</th>
//                 <th className="px-4 py-2 bg-gray-200">Paid Amount</th>
//                 <th className="px-4 py-2 bg-gray-200">Balance</th>
//                 <th className="px-4 py-2 bg-gray-200">Option</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking._id}>
//                   <td className="px-4 py-2">{booking.carId}</td>
//                   <td className="px-4 py-2">{booking._id}</td>
//                   <td className="px-4 py-2">{new Date(booking.bookingDate).toLocaleDateString('en-GB')}</td>
//                   <td className="px-4 py-2">{new Date(booking.pickupDate).toLocaleDateString('en-GB')}</td>
//                   <td className="px-4 py-2">{new Date(booking.dropoffDate).toLocaleDateString('en-GB')}</td>
//                   <td className="px-4 py-2">{booking.totalAmount}</td>
//                   <td className="px-4 py-2">{booking.paymentType}</td>
//                   <td className="px-4 py-2">{booking.amountToPay}</td>
//                   <td className="px-4 py-2">{booking.balance}</td>

//                   <td className="px-4 py-2">
//                     <button
//                       className="text-red-500 underline"

//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     ) : null
//   );
// };

// export default ProfilePage;



import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../axios';

const ProfilePage = () => {
  const user = useSelector(state => state.user.details);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId, pickupDate) => {
    try {
      const currentDate = new Date();
      const isBeforePickup = new Date(pickupDate) > currentDate;

      if (isBeforePickup) {
        // Cancel the booking
        await axios.post('/cancelBooking', {
          bookingId: bookingId,
          message: 'Your booking has been cancelled.'
        });


        const updatedBookings = bookings.map(booking =>
          booking._id === bookingId ? { ...booking, status: 'Cancelled' } : booking
        );

        // Update the state with the updated bookings
        setBookings(updatedBookings);
      } else {
        console.log('Cannot cancel after pickup date');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/userbookings', {
        params: {
          userId: user._id
        }
      });
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    user ? (
      <div className="flex min-h-screen mt-2">
        <div className="lg:w-1/3 p-8 bg-gray-100 flex flex-col justify-center">
          <div className="text-center">
            {/* User details */}
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            {/* <Link to="/adddocuments">
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add Document</button>
            </Link> */}
            <Link to={`/adddocuments`}>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add Document</button>
            </Link>

            <Link to="/edituserProfile">
              <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md ml-2">Edit</button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-2xl font-bold">My Bookings</h2>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200">CarId</th>
                <th className="px-4 py-2 bg-gray-200">BookingId</th>
                <th className="px-4 py-2 bg-gray-200">Booking Date</th>
                <th className="px-4 py-2 bg-gray-200">Pickup Date</th>
                <th className="px-4 py-2 bg-gray-200">Dropoff Date</th>
                <th className="px-4 py-2 bg-gray-200">Total Amount</th>
                <th className="px-4 py-2 bg-gray-200">Type of Payment</th>
                <th className="px-4 py-2 bg-gray-200">Paid Amount</th>
                <th className="px-4 py-2 bg-gray-200">Balance</th>
                <th className="px-4 py-2 bg-gray-200">Option</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-2">{booking.carId}</td>
                  <td className="px-4 py-2">{booking._id}</td>
                  <td className="px-4 py-2">{new Date(booking.bookingDate).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-2">{new Date(booking.pickupDate).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-2">{new Date(booking.dropoffDate).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-2">{booking.totalAmount}</td>
                  <td className="px-4 py-2">{booking.paymentType}</td>
                  <td className="px-4 py-2">{booking.amountToPay}</td>
                  <td className="px-4 py-2">{booking.balance}</td>
                  <td className="px-4 py-2">
                    {booking.status === 'Cancelled' ? (
                      <span className="text-red-500">Booking Cancelled</span>
                    ) : new Date(booking.pickupDate) > new Date() ? (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleCancel(booking._id, booking.pickupDate)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        disabled
                      >
                        Booking Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : null
  );
};

export default ProfilePage;
