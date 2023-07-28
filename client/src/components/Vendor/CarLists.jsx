
// import React, { useEffect, useState } from "react";
// import axios from "../../axios";
// import DataTable from "react-data-table-component";
// import { useSelector } from 'react-redux';

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const { vendor } = useSelector(state => state);
//   const vendorId = vendor.details._id;

//   const fetchCars = async () => {
//     try {
//       const response = await axios.get(`/vendor/carlist/${vendorId}`);
//       if (!response.data.err) {
//         setCars(response.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

// const columns = [
//   {
//     name: "No",
//     selector: (row, index) => index + 1,
//     sortable: true,
//   },
//   {
//     name: "Car Id",
//     selector: "_id",
//     sortable: true,
//   },
//   {
//     name: "Car Model",
//     selector: "model",
//     sortable: true,
//   },
//   {
//     name: "Year",
//     selector: "year",
//     sortable: true,
//   },
//   {
//     name: "Mileage",
//     selector: "mileage",
//     sortable: true,
//     format: (row) => `${row.mileage} kmpl`,
//   },
//   {
//     name: "Fuel Type",
//     selector: "fuelType",
//     sortable: true,
//   },
//   {
//     name: "Transmission Mode",
//     selector: "transmissionMode",
//     sortable: true,
//   },
//   {
//     name: "Specification",
//     selector: "specifications",
//     sortable: true,
//   },
//   {
//     name: "Rent Per day",
//     selector: "rentPerDay",
//     sortable: true,
//   },
//   {
//     name: "Status",
//     selector: "isBooked",
//     sortable: true,
//     format: (row) => (row.isBooked ? "Booked" : "Available"),
//   },
//   {
//     name: "RC Image",
//     cell: (row) => (
//       <>
//         {row.rcImage.map((image, index) => (
//           <img
//             key={index}
//             src={`http://localhost:5000/images/${image.filename}`}
//             alt={`RC Image`}
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     name: "Car Images",
//     cell: (row) => (
//       <>
//         {row.carImages.map((image, index) => (
//           <img
//             key={index}
//             src={`http://localhost:5000/images/${image.filename}`}
//             alt={`Car Image`}
//           />
//         ))}
//       </>
//     ),
//   },
  
// ];

//   return (
//     <div
//       className="relative overflow-x-auto rounded-md"
//       style={{ paddingRight: "300px", paddingTop: "100px" }}
//     >
//       <DataTable
//         columns={columns}
//         data={cars}
//         pagination
//         highlightOnHover
//         noHeader
//         striped
//         responsive
//         customStyles={{
//           table: {
//             marginBottom: 0,
//           },
//           header: {
//             fontSize: "1rem",
//             fontWeight: "bold",
//             backgroundColor: "#F3F4F6",
//             color: "#111827",
//             paddingTop: "12px",
//             paddingBottom: "12px",
//           },
//           rows: {
//             style: {
//               minHeight: "90px", // Adjust the row height as needed
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default CarList;
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import DataTable from "react-data-table-component";
import { useSelector } from 'react-redux';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const { vendor } = useSelector(state => state);
  const vendorId = vendor.details._id;
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCars = async () => {
    try {
      const response = await axios.get(`/vendor/carlist/${vendorId}`);
      if (!response.data.err) {
        setCars(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Function to handle changes in the search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter the cars based on the search query
  const filteredCars = cars.filter(car => {
    return (
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.year.toString().includes(searchQuery) ||
      car.mileage.toString().includes(searchQuery) ||
      car.fuelType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.transmissionMode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.specifications.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.rentPerDay.toString().includes(searchQuery)
    );
  });
  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
   
    {
      name: "Car Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Year",
      selector: "year",
      sortable: true,
    },
    {
      name: "Mileage",
      selector: "mileage",
      sortable: true,
      format: (row) => `${row.mileage} kmpl`,
    },
    {
      name: "Fuel Type",
      selector: "fuelType",
      sortable: true,
    },
    {
      name: "Transmission Mode",
      selector: "transmissionMode",
      sortable: true,
    },
    {
      name: "Specification",
      selector: "specifications",
      sortable: true,
    },
    {
      name: "Rent Per day",
      selector: "rentPerDay",
      sortable: true,
    },
    {
      name: "Status",
      selector: "isBooked",
      sortable: true,
      format: (row) => (row.isBooked ? "Booked" : "Available"),
    },
    {
      name: "RC Image",
      cell: (row) => (
        <>
          {row.rcImage.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/images/${image.filename}`}
              alt={`RC Image`}
            />
          ))}
        </>
      ),
    },
    {
      name: "Car Images",
      cell: (row) => (
        <>
          {row.carImages.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/images/${image.filename}`}
              alt={`Car Image`}
            />
          ))}
        </>
      ),
    },
    
  ];

  return (
    <div className="relative overflow-x-auto rounded-md" style={{ paddingRight: "300px", paddingTop: "100px" }}>
      {/* Search input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search cars..."
        style={{
          marginBottom: "10px",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "300px",
        }}
      />

      {/* DataTable */}
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
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#F3F4F6",
            color: "#111827",
            paddingTop: "12px",
            paddingBottom: "12px",
          },
          rows: {
            style: {
              minHeight: "90px", // Adjust the row height as needed
            },
          },
        }}
      />
    </div>
  );
};

export default CarList;
