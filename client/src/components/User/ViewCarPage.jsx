
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProductPage = () => {

  const user = useSelector(state => state.user.details);
  const userId = user ? user._id : null;
  const [carData, setCarData] = useState(null);
  const [activeImg, setActiveImage] = useState(null);
  const { id } = useParams();
  const [dropoffDateAvailable, setDropoffDateAvailable] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const res = axios.get(`/viewcar/${id}`)
      .then(response => {
        setCarData(response.data.car);
        setActiveImage(response.data.car.carImages[0]);
        const booking = response.data.books;
        if (booking) {
          const { dropoffDate } = booking;
          const options = { day: '2-digit', month: 'long', year: 'numeric' };
          const formattedDropoffDate = new Date(dropoffDate).toLocaleDateString('en-GB', options);
          setDropoffDateAvailable(formattedDropoffDate);
        }
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  const chatHandler = () => {
    const { vendorId } = carData;
    console.log(vendorId);
    const response = axios.post('/chat', { vendorId, userId }).then(response => {
      if (response.data.sucess) {
        navigate('/chat');
      } else {
        console.error('Chat creation failed');
      }
    })
  }
  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  return (
    <div className='flex flex-col lg:flex-row  items-center justify-center gap-16 lg:items-center mx-10 py-20 mt-4'>

      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center mx-10'>
        {activeImg && (
          <img
            src={`http://localhost:5000/images/${activeImg.filename}`}
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
                  src={`http://localhost:5000/images/${image.filename}`}
                  alt={`Car Image ${image._id}`}
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
            ))}
        </div>
      </div>


      <div className='w-full lg:w-1/2 flex flex-col gap-4 items-center lg:items-start'>
        <h1 className='text-4xl'>Car Details</h1>
        {carData && (
          <>
            <h1 className=' text-2xl font-semibold'>Model: {carData.model}</h1>
            <h2 className='text-lg'>Year: {carData.year}</h2>
            <h2 className='text-lg'>Mileage: {carData.mileage} kmpl</h2>
            <h2 className='text-lg'>Fuel Type: {carData.fuelType}</h2>
            <h2 className='text-lg'>Transmission Mode: {carData.transmissionMode}</h2>
            <h2 className='text-lg'>Specification: {carData.specifications}</h2>
            <h2 className='text-lg'>Rent Per Day:  &#8377; {carData.rentPerDay}</h2>
            <h2 className='text-lg'>Location: {carData.location}</h2>
            <h1></h1>
            {userId ? (
              <>
                {carData.isBooked ? (
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
                  <div className="flex justify-center">
                    <Link to={`/booking/${carData._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded">
                        Book Now
                      </button>
                    </Link>
                  </div>
                )}
                <p className='text-green-500' onClick={chatHandler}>Chat with Us</p>
              </>
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
  );
};

export default ProductPage;
