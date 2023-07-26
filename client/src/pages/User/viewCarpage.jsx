
import React from 'react';
import Nav from '../../components/User/Nav';
import ViewPage from '../../components/User/ViewCarPage';
import Footer from '../../components/User/footer';

const viewCarpage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <ViewPage className="flex-grow" />
      <Footer />
    </div>
  );
};

export default viewCarpage;
