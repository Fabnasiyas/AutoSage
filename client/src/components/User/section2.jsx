import React from 'react';
import img from '../../assets/white.png'

const MyPage = () => {
  return (
  
    <div className=" mx-auto flex items-center border bg-blue-900 ">
      <div className="w-1/2 pl-8">
        <img src={img} alt="Car" style={{ width: '70%' ,paddingLeft:'120px'}} />
      </div>
      <div className="w-1/2 pl-2">
        <h1 className="text-3xl font-bold text-white">Do You Want To Earn With Us?  So<br/>
 Don’t Be Late</h1>
        <button className="px-4 py-2 bg-white text-blue rounded-lg mt-4"> Register Your car </button>
      </div>
    </div>
  );
};

export default MyPage;
        