import React from 'react';
import Profile from '../../components/User/UserProfile';
import Nav from '../../components/User/Nav';
import Footer from '../../components/User/footer';

const UserProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Profile />
      <Footer />
    </div>
  );
};

export default UserProfilePage;
