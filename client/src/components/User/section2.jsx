
import React from 'react';
import img from '../../assets/white.png';
import { Link } from 'react-router-dom';

const MyPage = () => {
  return (
    <div className="mx-auto flex flex-col md:flex-row items-center justify-content-center border bg-blue-900">
      <div style={{ display: 'flex', justifyContent: 'center' }} className="w-full md:w-1/2 p-4 md:p-8">
        <div style={{ width: '500px' }}>

          <img src={img} alt="Car" className="w-32 md:w-48 mx-auto md:mx-0 md:pl-0  rounded-lg shadow-lg" style={{ width: '500px' }} />
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4 md:p-8 text-center md:text-left">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Do You Want To Earn With Us? So<br />
          Don’t Be Late
        </h1>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor, lacus eget
          consectetur volutpat, lorem quam sagittis nisl, ut pulvinar eros ipsum ac mauris.
        </p>

        <Link to='/vendor/login'>
          <button className="px-4 py-2 bg-white text-blue rounded-lg mt-4">Register Your Car</button></Link>
      </div>
    </div>
  );
};

export default MyPage;
