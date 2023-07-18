
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import Card from '../../components/User/bookingcard'; // Import the Card component

const ProfilePage = () => {
  const user = useSelector(state => state.user.details);
  const [bookings, setBookings] = useState([]);
  console.log('====================================');
  console.log(bookings);
  console.log('====================================');
  useEffect(() => {
    fetchBookings();
  }, [user]);

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
  
        // Update the state with the updated bookings
        const updatedBookings = bookings.map(booking =>
          booking._id === bookingId ? { ...booking, isCancelled: true } : booking
        );
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

  return (
    user ? (
      <div className="flex min-h-screen mt-2">
        <div className="lg:w-1/4 p-8 bg-gray-100 flex flex-col justify-center">
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
        </div>
        <div className="w-full lg:w-3/4 p-8">
          {/* <h2 className="text-2xl font-bold mb-7">My Bookings</h2> */}
          <div>
            <h1 className="text-2xl font-bold mb-4">Upcoming Bookings</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  
  {bookings
    .filter((booking) => !booking.isCancelled && new Date(booking.pickupDate) > new Date())
    .map((booking) => (
      <Card key={booking._id} booking={booking} handleCancel={handleCancel} />
    ))}
</div>

          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 mt-7">Completed Bookings</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  {/* Map and render completed bookings */}
  {bookings
    .filter((booking) => !booking.isCancelled && new Date(booking.pickupDate) <= new Date())
    .map((booking) => (
      <Card key={booking._id} booking={booking} handleCancel={handleCancel} />
    ))}
</div>

          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 mt-7">Cancelled Bookings</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  {/* Map and render cancelled bookings */}
  {bookings
    .filter((booking) => booking.isCancelled)
    .map((booking) => (
      <Card key={booking._id} booking={booking} handleCancel={handleCancel} />
    ))}
</div>

          </div>
        </div>
      </div>
    ) : null
  );
  
};

export default ProfilePage;
