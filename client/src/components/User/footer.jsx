import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4  bottom-0 left-0 right-0 mt-1 border">
      <div className="flex justify-between pt-4">
        <div className="text-center flex-1">
          <h1 className="font-bold  mb-2">AutoRent</h1>
          <p className='font-bold '>The Best CarRentel Agency</p>
        </div>
        <div className="text-center flex-1 mb-2">
            <h3 className="font-bold  mb-2">Contact Info:</h3>
          <p className=''>Mail: autorent@example.com</p>
          <p className=''>Phone: +1 123-456-7890</p>
        </div>
      </div>
      <div className="text-center mt-6  border bg-blue-900 ">
        <p className=" font-bold text-white mt-5 mb-5 ">&copy; {new Date().getFullYear()} AutoRent. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
