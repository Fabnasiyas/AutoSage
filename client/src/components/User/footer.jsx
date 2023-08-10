import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 bottom-0 left-0 right-0 mt-1 border">
      <div className="flex items-center justify-center mb-4">
        <p className="font-bold mr-2">Get connected with us on Social media:</p>
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="text-red-500 hover:text-red-600 transition"
            />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="lg"
              className="text-green-500 hover:text-green-600 transition"
            />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="lg"
              className="text-blue-500 hover:text-blue-600 transition"
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between bg-blue-900 text-white">
        <div className="text-center md:flex-1 p-4">
          <h1 className="font-bold mb-2">AutoSage</h1>
          <p className="font-bold">The Best Car Rental Agency</p>
        </div>
        <div className="text-center md:flex-1 p-4">
          <h3 className="font-bold mb-2">Contact Info:</h3>
          <p className="">Mail: autosage@example.com</p>
          <p className="">Phone: +91 123-456-7890</p>
        </div>
      </div>
      <div className="text-center bg-blue-900 p-4">
        <p className="font-bold text-white">
          &copy; {new Date().getFullYear()} AutoSage. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
