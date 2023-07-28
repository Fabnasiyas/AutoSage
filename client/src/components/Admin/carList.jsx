
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import DataTable from 'react-data-table-component';

const AdminCarList = () => {
  const [cars, setCars] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchAllCars = async () => {
    try {
      const response = await axios.get("/admin/allcarlist");
      if (!response.data.err) {
        setCars(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      style: {
        paddingLeft: '16px',
      },
    },
   
    {
      name: 'Car Model',
      selector: 'model',
      sortable: true,
    },
    {
      name: 'Car Year',
      selector: 'year',
      sortable: true,
    },
    {
      name: 'Rent Per Day',
      selector: 'rentPerDay',
      sortable: true,
    },
    {
      name: 'Location',
      selector: 'location',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'isBooked',
      sortable: true,
      cell: (row) => (row.isBooked ? 'Booked' : 'Available'),
    },
  ];

  const filteredCars = cars.filter((car) => {
    const vendorId = car.vendorId ? car.vendorId.toLowerCase() : '';
    const carId = car._id ? car._id.toLowerCase() : '';
    const model = car.model ? car.model.toLowerCase() : '';
    const location = car.location ? car.location.toLowerCase() : '';
  
    return (
      vendorId.includes(searchText.toLowerCase()) ||
      carId.includes(searchText.toLowerCase()) ||
      model.includes(searchText.toLowerCase()) ||
      location.includes(searchText.toLowerCase())
    );
  });
  

  return (
    <div className="relative overflow-x-auto" style={{ marginRight: '100px', marginTop: '100px' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-4"
      />
      <DataTable
        columns={columns}
        data={filteredCars}
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
              minHeight: '56px',
            },
          },
        }}
      />
    </div>
  );
};

export default AdminCarList;
