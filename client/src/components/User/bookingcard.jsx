
import {  useNavigate} from 'react-router-dom';
import React, { useState} from 'react';
import axios from '../../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
const Card = ({ booking, handleCancel }) => {
  const { _id, carData, pickupDate, isCancelled, totalAmount, paymentType, vendorId, dropoffDate ,balance} = booking;
  const [showDetails, setShowDetails] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();
  const handleCancelButtonClick = () => {
    if (!isCancelled && new Date(pickupDate) > new Date()) {
      handleCancel(_id, pickupDate);
    }
  };

  const handleViewDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  const firstCarImage = carData.carImages.length > 0 ? carData.carImages[0] : '';
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };



  const openModal = () => {
    setCheckout(true);
  };

  const closeModal = () => {
    setCheckout(false);
  };

  return (
    <div className="border border-gray-300 rounded p-4">
      <img src={`http://localhost:5000/images/${firstCarImage.filename}`} alt={carData.model} className="w-full h-32 object-cover mb-2" />
      <h3 className="text-lg font-bold mb-2">{carData.model}</h3>
      {showDetails && (
        <div>
          <p><b>Booking ID:</b> {_id}</p>
          <p><b>Car Model:</b> {carData.year}</p>
          <p><b>Vendor ID:</b> {vendorId}</p>
          <p><b>Fuel Type:</b> {carData.fuelType}</p>
          <p><b>Pickup Date:</b> {formatDate(pickupDate)}</p>
          <p><b>Dropoff Date:</b> {formatDate(dropoffDate)}</p>
          <p><b>Total Amount:</b> {totalAmount}</p>
          <p><b>Payment Type:</b> {paymentType}</p>
        </div>
      )}
      <div className="flex justify-between mt-4">
        {isCancelled ? (
          <span className="text-red-500">Booking Cancelled</span>
        ) : new Date(pickupDate) > new Date() ? (
          <>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancelButtonClick}
            >
              Cancel
            </button>
            {balance !== 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={openModal}
              >
                Payment
              </button>
            )}
          </>
        ) : (
          <button className="text-green-500" disabled>
            Booking Completed
          </button>
        )}
        <button
          className="text-black font-bold py-2 px-4 rounded ml-2"
          onClick={handleViewDetailsClick}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
      <Modal
        isOpen={checkout}
        onRequestClose={closeModal}
        contentLabel="PayPal Payment"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black opacity-90"
      >
        <div style={{ width: '500px' }} className="bg-white rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">PayPal Payment</h2>
          {balance && (
            <>
              <p className="text-center mb-3">
                Payment Amount: {'\u20B9'}
                {balance}
              </p>

              <PayPalScriptProvider
                options={{
                  "client-id": "Abhp9DIDpqLlpmwjLxCUOBJhsJPefegAgL7aTXjA8Q6CBkR5oV4IeeRI4EpMXjdRjPmdWDWMmgK0T0m2",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { value: balance } }],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    await actions.order.capture();

                    closeModal();

                    // Send booking data to the server
                    axios
                      .post('/advanceComplete',  { bookingDetails: booking, paymentAmount: balance })
                      .then((response) => {
                        
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
    </div>
  );
};

export default Card;
