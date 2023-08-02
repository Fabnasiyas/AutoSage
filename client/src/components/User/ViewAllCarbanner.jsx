import React from 'react';
import carImage from '../../assets/car2.jpeg';


const Banner = () => {
  const bannerHeight = "400px"; // Adjust the height as needed

  return (
    <div className='pt-1'>
      <div className="relative ">
        {/* <Nav/> */}
        <div
          className="h-full bg-cover bg-center "
          style={{
            height: bannerHeight,
            backgroundImage: `url(${carImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" ></div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl text-bold text-white mb-4">All Cars</h1>
          </div>
        </div>
      </div></div>
  );
};

export default Banner;