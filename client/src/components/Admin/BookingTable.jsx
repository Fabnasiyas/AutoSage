
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import DataTable from 'react-data-table-component';

const BookTable = () => {
  const [book, setBook] = useState([]);
  
  const [searchText, setSearchText] = useState('');

  const fetchBookList = async () => {
    try {
      const response = await axios.get('/admin/bookingList');
      if (!response.data.err) {
        setBook(response.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookList();
  }, [book]);





  const columns = [
    {
        name: 'Booking Id',
        selector: '_id',
        sortable: true,
      },
      {
        name: 'User Id',
        selector: 'userId',
        sortable: true,
      },
      {
        name: 'Vendor Id',
        selector: 'vendorId',
        sortable: true,
      },
     
      {
        name: 'CarId',
        selector: 'carId',
        sortable: true,
      },
    
    
      {
        name: 'Booking Date',
        selector: 'bookingDate',
        sortable: true,
        format: (row) => {
          const date = new Date(row.bookingDate);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
        },
        {
            name: 'Pickup Date',
            selector: 'pickupDate',
            sortable: true,
            format: (row) => {
              const date = new Date(row.pickupDate);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            },
          },
          {
            name: 'Dropoff Date',
            selector: 'dropoffDate',
            sortable: true,
            format: (row) => {
              const date = new Date(row.dropoffDate);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            },
          },
      {
        name: 'Amount To Pay',
        selector: 'amountToPay',
        sortable: true,
      },
      {
        name: 'Total Amount',
        selector: 'totalAmount',
        sortable: true,
      },
      {
        name: 'Balance',
        selector: 'balance',
        sortable: true,
      },
      {
        name: 'Payment Type',
        selector: 'paymentType',
        sortable: true,
      },

   
    
  ];

  return (
    <div className="  rounded-md" style={{ paddingRight: '300px', paddingTop: '200px', paddingLeft: '50px' }}
    >
      <div className="mb-4" >
        <input
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 "
        />
      </div>
      <DataTable
  columns={columns}
  data={book.filter((item) =>
    item.bookingDate.toLowerCase().includes(searchText.toLowerCase())
  )}
  pagination
  highlightOnHover
  noHeader
  striped
  responsive
  customStyles={{
    table: {
      marginBottom: 0,
    },
    header: {
      fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: '#F3F4F6',
      color: '#111827',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
    rows: {
      style: {
        minHeight: '56px', // Adjust the row height as needed
      },
    },
  }}
/>

     
    
    </div>
  );
};

export default BookTable;
