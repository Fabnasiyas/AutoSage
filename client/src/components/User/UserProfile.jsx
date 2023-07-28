
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import Card from '../../components/User/bookingcard'; // Import the Card component

const ProfilePage = () => {
  const user = useSelector(state => state.user.details);
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5; // Number of bookings to show per page
  const [showRefundModal, setShowRefundModal] = useState(false);
  useEffect(() => {
    fetchBookings();
  }, [user]);
  const handleRefundModal = () => {
    setShowRefundModal(!showRefundModal);
  };
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
        handleRefundModal();
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

  // Calculate index of the first and last booking to show on the current page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Function to generate the pagination numbers
  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(bookings.length / bookingsPerPage); i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`px-2 py-1 mx-1 cursor-pointer ${
            currentPage === i ? 'bg-gray-300' : 'bg-gray-200'
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
            <h1 className="text-2xl font-bold mb-4">Upcoming Bookings</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {currentBookings
                .filter((booking) => !booking.isCancelled && new Date(booking.pickupDate) > new Date())
                .map((booking) => (
                  <Card key={booking._id} booking={booking} handleCancel={handleCancel} />
                ))}
            </div>
            
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 mt-7">Completed Bookings</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {currentBookings
                .filter((booking) => !booking.isCancelled && new Date(booking.pickupDate) <= new Date())
                .map((booking) => (
                  <Card key={booking._id} booking={booking} handleCancel={handleCancel} />
                ))}
            </div>
           
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 mt-7">Cancelled Bookings</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {currentBookings
                .filter((booking) => booking.isCancelled)
                .map((booking) => (
                  <Card key={booking._id} booking={booking} handleCancel={handleCancel} />
                ))}
            </div>
            {/* Pagination numbers */}
            
          </div>
          <div className="flex justify-center mt-4">
              {renderPaginationNumbers()}
            </div>
        </div>
        {showRefundModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-xl font-semibold mb-4">
              Payment Refunded to Your Wallet
            </p>
            <p>
              The payment for this booking has been refunded to your wallet.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleRefundModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      
    ) : null
  );
};

export default ProfilePage;





