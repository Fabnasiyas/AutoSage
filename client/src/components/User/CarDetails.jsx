import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  const [showWalletConfirmation, setShowWalletConfirmation] = useState(false);
  const userId = user ? user._id : null;
  const [activeImg, setActiveImg] = useState(null);
  const doc = user && Array.isArray(user.drivingLicense) && Array.isArray(user.aadharCard)
    ? [...user.drivingLicense, ...user.aadharCard]
    : null;
  const handleImageClick = (image) => {
    setActiveImg(image);
  };
  const dispatch = useDispatch()
  const [dropoffDateAvailable, setDropoffDateAvailable] = useState(null);
  const fetchCar = async () => {
    try {
      const response = await axios.get(`/viewcardetails/${id}`);
      if (!response.data.err) {
        setCar(response.data.car);
        setActiveImg(response.data.car.carImages[0]);
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
  }, [userId]);

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
  };

  const handleDropoffDateChange = (date) => {
    setDropoffDate(date);
  };
  const handleProceed = () => {
    if (pickupDate && dropoffDate) {
      const oneDay = 24 * 60 * 60 * 1000;
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

  const handleBookAdvancePayment = async () => {
    if (userId) {
      if (pickupDate && dropoffDate) {
        const oneDay = 24 * 60 * 60 * 1000;
        const totalDays = Math.round(Math.abs((dropoffDate - pickupDate) / oneDay));
        const totalAmount = totalDays * car.rentPerDay;
        const amountToPay = totalAmount / 2;
        const balance = totalAmount - amountToPay;
        if (user.wallet === 0) {
          try {
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
              paymentType: 'Advance Payment',
              paymentAmount: amountToPay,
            };
            setBookingData(bookingData);
            setPaymentSelection(null);
            setCheckout(true);
          } catch (error) {
            console.error('Error processing PayPal payment:', error);
            alert('Error processing payment. Please try again later.');
          }
        } else if (user.wallet >= amountToPay) {
          try {
            const updatedWalletAmount = user.wallet - amountToPay;
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
              paymentType: 'Advance Payment',
              paymentAmount: amountToPay,
              updatedWalletAmount,
            };
            setBookingData(bookingData);
            setShowWalletConfirmation(true);
          } catch (error) {
            console.error('Error updating wallet:', error);
            alert('Error processing payment. Please try again later.');
          }
        } else {
          try {
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
              paymentType: 'Advance Payment',
              paymentAmount: amountToPay - user.wallet,
              updatedWalletAmount: 0,
            };
            setBookingData(bookingData);
            setPaymentSelection(null);
            setCheckout(true);
          } catch (error) {
            console.error('Error updating wallet:', error);
            alert('Error processing payment. Please try again later.');
          }
        }
      } else {
        alert('Please select both pickup and drop-off dates');
      }
    } else {
      navigate('/login');
    }
  };

  const handleWalletConfirmation = async () => {
    try {
      await axios.post(`/update-walletamount/${userId}`, { wallet: bookingData.updatedWalletAmount, bookingData }).then((response) => {
      })
      dispatch({ type: "refresh" })
      navigate('/success');
    } catch (error) {
      console.error('Error updating wallet or booking:', error);
      alert('Error processing payment. Please try again later.');
    }
  };

  const handleBookFullPayment = async () => {
    if (userId) {
      if (pickupDate && dropoffDate) {
        const oneDay = 24 * 60 * 60 * 1000;
        const totalDays = Math.round(Math.abs((dropoffDate - pickupDate) / oneDay));
        const totalAmount = totalDays * car.rentPerDay;
        const amountToPay = totalAmount;
        const balance = totalAmount - amountToPay;
        console.log(balance);
        console.log(amountToPay);
        console.log(oneDay );
        if (user.wallet === 0) {
          try {
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
              paymentType: 'Full Payment',
              paymentAmount: amountToPay,
            };
            setBookingData(bookingData);
            console.log(bookingData);
            setPaymentSelection(null);
            setCheckout(true);
          } catch (error) {
            console.error('Error processing PayPal payment:', error);
            alert('Error processing payment. Please try again later.');
          }
        } else if (user.wallet >= amountToPay) {
          try {
            const updatedWalletAmount = user.wallet - amountToPay;
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
              paymentType: 'Full Payment',
              paymentAmount: 0,
              updatedWalletAmount,
            };
            setBookingData(bookingData);
            setShowWalletConfirmation(true);
          } catch (error) {
            console.error('Error updating wallet:', error);
            alert('Error processing payment. Please try again later.');
          }
        } else {
          try {
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
              paymentType: 'Full Payment',
              paymentAmount: amountToPay - user.wallet,
              updatedWalletAmount: 0,
            };
            setBookingData(bookingData);
            setPaymentSelection(null);
            setCheckout(true);
          } catch (error) {
            console.error('Error updating wallet:', error);
            alert('Error processing payment. Please try again later.');
          }
        }
      } else {
        alert('Please select both pickup and drop-off dates');
      }
    } else {
      navigate('/login');
    }
  };

  const currentDate = new Date();
  const closeModal = () => {
    setCheckout(false);
  };

  if (!car || !car.carImages || car.carImages.length === 0) {
    return null;
  }
  if (showWalletConfirmation) {
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => setShowWalletConfirmation(false)}
        contentLabel="Wallet Payment Confirmation"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black opacity-70"
      >
        <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Confirm Payment with Wallet</h2>
          <p className="text-center">
            Are you sure you want to confirm the payment using your wallet for the Advance Payment?
          </p>
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded mr-2"
              onClick={() => {
                setShowWalletConfirmation(false);
                handleWalletConfirmation();
              }}
            >
              Confirm
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded"
              onClick={() => setShowWalletConfirmation(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
  if (paymentSelection) {
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => setPaymentSelection(null)}
        contentLabel="Payment Selection"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black opacity-70"
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
      <div className="flex flex-col md:flex-row py-8 md:py-32 mt-4">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          {activeImg && (
            <img
              src={`${process.env.REACT_APP_BASEURL}/images/${activeImg.filename}`}
              alt={`Car Image ${activeImg.id}`}
              className="w-2/3 h-auto aspect-square object-cover rounded-xl shadow-lg"
            />
          )}
          <div className="flex flex-row justify-center mt-6">
            {car &&
              car.carImages.map((image, index) => (
                <div
                  key={index}
                  className={`image-container cursor-pointer ${activeImg === image ? 'border-2 border-violet-600' : 'border border-gray-300'
                    } rounded-md h-16 w-16 mx-2`}
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={`${process.env.REACT_APP_BASEURL}/images/${image.filename}`}
                    alt={`Car Image ${image._id}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center">
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
                    doc && doc.length > 0 ? (
                      user.isadminVerified ? (

                        <div className="flex justify-center">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded"
                            onClick={handleProceed}
                          >
                            Proceed
                          </button>
                        </div>
                      ) :
                        (
                          <div>
                            <p className="text-red-500 mb-4">
                              You are Not approved by the Admin.
                            </p>
                          </div>
                        )) : (
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
      <Modal
        isOpen={checkout}
        onRequestClose={closeModal}
        contentLabel="PayPal Payment"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black opacity-80"
      >
        <div style={{ width: '500px' }} className="bg-white rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">PayPal Payment</h2>
          {bookingData && (
            <>
              <p className="text-center mb-3">
                Total Amount: {'\u20B9'}
                {bookingData.amountToPay}
              </p>
              <p className="text-center mb-3">
                Wallet Amount: {'\u20B9'}
                {user.wallet}
              </p>

              <p className="text-center mb-3">
                Payment Due: {'\u20B9'}

                {bookingData.paymentAmount}
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
                    axios
                      .post('/bookings', bookingData)
                      .then((response) => {
                        console.log('Booking by advance payment:', pickupDate, dropoffDate);
                        console.log('Booking details:', response.data);
                      })
                      .catch((error) => {
                        console.error('Error booking:', error);
                      });
                    axios.post(`/update-wallet/${userId}`, { wallet: bookingData.updatedWalletAmount }).then((response) => {
                      console.log(response.data);
                    }).catch((error) => {
                      console.error('Error booking:', error);
                    });
                    dispatch({ type: "refresh" })
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