import React from 'react';
import carImage from '../../assets/car2.jpeg';


const Banner = () => {
  const bannerHeight = "600px"; // Adjust the height as needed

  return (
      <div className="relative mt-1" >
 
      <div
        className="h-full bg-cover bg-center"
        style={{
          height: bannerHeight,
          backgroundImage: `url(${carImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <h1 className="text-6xl text-white mb-4 font-bold">Don't Dream It Ride It</h1>
          <p className="text-lg text-white font-bold">Best Services With The Best Work</p>
        </div>
      </div>

    </div>
    
  );
};

export default Banner;

