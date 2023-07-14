import React from 'react';
import bgImage from '../../assets/404page.gif';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
      <Link to='/'>
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
    </div>
    </Link>
  );
};

export default ErrorPage;
