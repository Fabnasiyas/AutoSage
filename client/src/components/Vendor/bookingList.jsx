
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

const BookingList = () => {
  const [booking, setBooking] = useState([]);
  const vendor = useSelector(state => state.vendor);
  const vendorId = vendor.details._id;
  const [availableBookings, setAvailableBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      const response = await axios.get(`/vendor/bookinglist`, {
        params: {
          vendorId: vendorId
        }
      });
      if (!response.data.err) {
        setBooking(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [vendorId]);

  const isReturned = dropoffDate => {
    const today = new Date();
    const dropoff = new Date(dropoffDate);
    return dropoff <= today;
  };

  const handleMakeAvailable = async bookingId => {
    try {
      await axios.patch(`/vendor/updateCarStatus/${bookingId}`, {
        isBooked: false
      });
      console.log(`Made booking with ID: ${bookingId} available`);
      setAvailableBookings([...availableBookings, bookingId]);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false
    },
    
    {
      name: 'Booking Date',
      selector: 'bookingDate',
      sortable: true,
      format: row => formatDate(row.bookingDate)
    },
    {
      name: 'Pickup Date',
      selector: 'pickupDate',
      sortable: true,
      format: row => formatDate(row.pickupDate)
    },
    {
      name: 'Dropoff Date',
      selector: 'dropoffDate',
      sortable: true,
      format: row => formatDate(row.dropoffDate)
    },
    {
      name: 'Total Amount',
      selector: 'totalAmount',
      sortable: true
    },
    {
      name: 'Payment Amount',
      selector: 'amountToPay',
      sortable: true
    },
    {
      name: 'Balance Amount',
      selector: 'balance',
      sortable: true
    },
    {
      name: 'Payment Type',
      selector: 'paymentType',
      sortable: true
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      format: row => (isReturned(row.dropoffDate) ? 'Returned' : 'On Rent')
    },
    {
      name: 'Options',
      cell: row => (
        <div>
          {isReturned(row.dropoffDate) && !availableBookings.includes(row._id) && (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleMakeAvailable(row._id)}
            >
              Make Available
            </button>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  return (
    <div className="relative overflow-x-auto" style={{ paddingTop: '100px', paddingRight: '100px' }}>
      <DataTable
        columns={columns}
        data={booking}
        pagination
        highlightOnHover
        noHeader
        striped
        responsive
        customStyles={{
          table: {
            marginBottom: 0
          },
          header: {
            fontSize: '1rem',
            fontWeight: 'bold',
            backgroundColor: '#F3F4F6',
            color: '#111827',
            paddingTop: '12px',
            paddingBottom: '12px'
          },
          rows: {
            style: {
              minHeight: '56px'
            }
          }
        }}
      />
    </div>
  );
};

export default BookingList;
