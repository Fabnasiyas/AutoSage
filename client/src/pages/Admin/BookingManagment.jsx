import React from 'react';
import Dashboard from '../../components/Admin/Dashboard';
import BookingTable from '../../components/Admin/BookingTable';

const BookingManagment = () => {
  return (
    <div className="flex">
      <Dashboard />
       <div className="flex-1 p-4 md:w-2/3" style={{ paddingLeft: '200px' }}>
        <BookingTable />
      </div>
    </div>
  );
};

export default BookingManagment;
