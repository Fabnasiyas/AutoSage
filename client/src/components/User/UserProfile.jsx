import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import Card from '../../components/User/bookingcard';
import Swal from 'sweetalert2';
const ProfilePage = () => {
  const user = useSelector(state => state.user.details);
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;
  const dispatch=useDispatch()
  useEffect(() => {
    fetchBookings();
  }, [user]);
 
  const handleCancel = async (bookingId, pickupDate) => {
    try {
      const currentDate = new Date();
      const isBeforePickup = new Date(pickupDate) > currentDate;
      if (isBeforePickup) {
        await axios.post('/cancelBooking', {
          bookingId: bookingId,
          message: 'Your booking has been cancelled.'
        });
        const updatedBookings = bookings.map(booking =>
          booking._id === bookingId ? { ...booking, isCancelled: true } : booking
        );
        setBookings(updatedBookings);
        dispatch({type:"refresh"})
        Swal.fire({
          icon: 'success',
          title: 'Booking Cancelled',
          text: 'Your booking has been successfully cancelled.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      } else {
        console.log('Cannot cancel after pickup date');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookings = async () => {
    try {
      if (user) {
        const response = await axios.get('/userbookings', {
          params: {
            userId: user._id
          }
        });
        setBookings(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(bookings.length / bookingsPerPage); i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`px-2 py-1 mx-1 cursor-pointer ${currentPage === i ? 'bg-gray-300' : 'bg-gray-200'
            }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (

    user ? (
      <div className="flex flex-col lg:flex-row py-16 lg:py-20">
        <div className="lg:w-1/4 p-8 bg-gray-100 flex flex-col justify-center mx-7">
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">User Profile</p>
            <p className="text-gray-700">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>
            <Link to={`/adddocuments`}>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Add Document
              </button>
            </Link>
            <Link to="/editProfile">
              <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md ml-2">
                Edit Profile
              </button>
            </Link>
          </div>
          <div className="mt-8 p-4 bg-white rounded-md shadow-md">
            <p className="text-2xl font-bold mb-4 text-center">Wallet</p>
            <div className="border-t-2 border-gray-200 py-4">
              <p className="text-gray-700 text-center">
                <strong>Amount:</strong> {user.wallet}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4 p-8">
          <div>
            <div>
              <h1 className="text-2xl font-bold mb-4 text-left">Upcoming Bookings</h1>
              {currentBookings
                .filter((booking) => !booking.isCancelled && new Date(booking.pickupDate) > new Date())
                .length === 0 ? (
                <p className="text-red-400 text-left"> No upcoming bookings.......</p>) : (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {currentBookings
                    .filter((booking) => !booking.isCancelled && new Date(booking.pickupDate) > new Date())
                    .map((booking) => (
                      <Card key={booking._id} booking={booking} handleCancel={handleCancel} />
                    ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 mt-7 text-left">Completed Bookings</h3>
            {currentBookings
              .filter((booking) => !booking.isCancelled && new Date(booking.pickupDate) <= new Date())
              .length === 0 ? (
              <p className="text-red-400 text-left">No completed bookings.......</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {currentBookings
                  .filter((booking) => !booking.isCancelled && new Date(booking.pickupDate) <= new Date())
                  .map((booking) => (
                    <Card key={booking._id} booking={booking} handleCancel={handleCancel} />
                  ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 mt-7 text-left">Cancelled Bookings</h3>
            {currentBookings
              .filter((booking) => booking.isCancelled)
              .length === 0 ? (
              <p className="text-red-400  text-left">No cancelled bookings.......</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {currentBookings
                  .filter((booking) => booking.isCancelled)
                  .map((booking) => (
                    <Card key={booking._id} booking={booking} handleCancel={handleCancel} />
                  ))}
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            {renderPaginationNumbers()}
          </div>
        </div>
     
      </div>
    ) : null
  );
};
export default ProfilePage;





