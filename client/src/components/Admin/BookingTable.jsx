
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import DataTable from 'react-data-table-component';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CSVLink } from 'react-csv';

const styles = StyleSheet.create({
 page: {
    fontFamily: 'Helvetica',
    padding: '1cm',
  },
  title: {
    fontSize: '24pt',
    marginBottom: '10pt',
    textAlign: 'center',
  },
  salesSummaryTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20pt',
  },
  salesSummaryTableRow: {
    flexDirection: 'row',
    borderBottomColor: '#aaa',
    borderBottomWidth: '1pt',
  },
  salesSummaryTableCell: {
    padding: '8pt',
    fontSize: '12pt',
    borderWidth: '1pt',
    borderColor: '#aaa',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bookingsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  bookingsTableHeaderRow: {
    flexDirection: 'row',
    borderBottomColor: '#aaa',
    borderBottomWidth: '1pt',
    backgroundColor: '#f0f0f0',
  },
  bookingsTableHeaderCell: {
    padding: '8pt',
    fontSize: '12pt',
    borderWidth: '1pt',
    borderColor: '#aaa',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bookingsTableRow: {
    flexDirection: 'row',
    borderBottomColor: '#aaa',
    borderBottomWidth: '1pt',
  },
  bookingsTableCell: {
    padding: '8pt',
    fontSize: '12pt',
    borderWidth: '1pt',
    borderColor: '#aaa',
    textAlign: 'center',
  },
});

const BookTable = () => {
  const [book, setBook] = useState([]);
  const [car, setCars] = useState([]);
  const [user, setUsers] = useState([]);
  const [vendor,setVendors]=useState([])
  const [searchText, setSearchText] = useState('');

  const fetchBookList = async () => {
    try {
      const response = await axios.get('/admin/bookingList');
      if (!response.data.err) {
        const { bookings, users, cars ,vendors} = response.data;
        setBook(bookings);
        setUsers(users);
        setCars(cars);
        setVendors(vendors)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookList();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const calculateSalesReportData = () => {
    const totalCars = car.length;
    const totalBookings = book.length;
    const totalRevenue = book.reduce((acc, item) => acc + item.totalAmount, 0);
    const totalUsers = user.length;
    const totalVendors=vendor.length
    return { totalCars, totalBookings, totalRevenue, totalUsers,totalVendors };
  };
  

  const generatePDFData = () => {
    const salesReportData = calculateSalesReportData();
    const { totalCars, totalBookings, totalRevenue, totalUsers,totalVendors } = salesReportData;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Sales Report</Text>
          <View style={styles.salesSummaryTable}>
            <View style={styles.salesSummaryTableRow}>
              <Text style={styles.salesSummaryTableCell}>Total Cars</Text>
              <Text style={styles.salesSummaryTableCell}>{totalCars}</Text>
            </View>
            <View style={styles.salesSummaryTableRow}>
              <Text style={styles.salesSummaryTableCell}>Total Bookings</Text>
              <Text style={styles.salesSummaryTableCell}>{totalBookings}</Text>
            </View>
            <View style={styles.salesSummaryTableRow}>
              <Text style={styles.salesSummaryTableCell}>Total Revenue</Text>
              <Text style={styles.salesSummaryTableCell}>{totalRevenue}</Text>
            </View>
            <View style={styles.salesSummaryTableRow}>
              <Text style={styles.salesSummaryTableCell}>Total Users</Text>
              <Text style={styles.salesSummaryTableCell}>{totalUsers}</Text>
            </View>
            <View style={styles.salesSummaryTableRow}>
              <Text style={styles.salesSummaryTableCell}>Total Vendors</Text>
              <Text style={styles.salesSummaryTableCell}>{totalVendors}</Text>
            </View>
          </View>
          <View style={styles.bookingsTable}>
            <View style={styles.bookingsTableHeaderRow}>
              <Text style={styles.bookingsTableHeaderCell}>No</Text>
              <Text style={styles.bookingsTableHeaderCell}>Booking Date</Text>
              <Text style={styles.bookingsTableHeaderCell}>Pickup Date</Text>
              <Text style={styles.bookingsTableHeaderCell}>Dropoff Date</Text>
              <Text style={styles.bookingsTableHeaderCell}>Total Amount</Text>
              <Text style={styles.bookingsTableHeaderCell}>Payment Type</Text>
            </View>
            {book.map((bookingItem, index) => (
              <View style={styles.bookingsTableRow} key={bookingItem._id}>
                <Text style={styles.bookingsTableCell}>{index + 1}</Text>
                <Text style={styles.bookingsTableCell}>{formatDate(bookingItem.bookingDate)}</Text>
                <Text style={styles.bookingsTableCell}>{formatDate(bookingItem.pickupDate)}</Text>
                <Text style={styles.bookingsTableCell}>{formatDate(bookingItem.dropoffDate)}</Text>
                <Text style={styles.bookingsTableCell}>{bookingItem.totalAmount}</Text>
                <Text style={styles.bookingsTableCell}>{bookingItem.paymentType}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  const generateCSVData = () => {
    const csvData = book.map((bookingItem) => ({
      'Booking Date': formatDate(bookingItem.bookingDate),
      'Pickup Date': formatDate(bookingItem.pickupDate),
      'Dropoff Date': formatDate(bookingItem.dropoffDate),
      'Total Amount': bookingItem.totalAmount,
      'Payment Type': bookingItem.paymentType,
    }));
    return csvData;
  };

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
  const filterData = () => {
    return book.filter((item) => {
      const bookingDateMatch = item.bookingDate.toLowerCase().includes(searchText.toLowerCase());
      const pickupDateMatch = item.pickupDate.toLowerCase().includes(searchText.toLowerCase());
      const dropoffDateMatch = item.dropoffDate.toLowerCase().includes(searchText.toLowerCase());
      const totalAmountMatch = item.totalAmount.toString().includes(searchText);
      const paymentTypeMatch = item.paymentType.toLowerCase().includes(searchText.toLowerCase());
      return bookingDateMatch || pickupDateMatch || dropoffDateMatch || totalAmountMatch || paymentTypeMatch;
    });
  };
  return (
    <div className="rounded-md" style={{ paddingRight: '300px', paddingTop: '100px', paddingLeft: '50px' }}>
      <h1 className='font-bold text-3xl text-center mb-10'>Booking List</h1>
       <div className="flex justify-between mb-10">
        <PDFDownloadLink document={generatePDFData()} fileName="sales_report.pdf">
          {({ loading }) =>
            loading ? (
              <span>Loading...</span>
            ) : (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download Sales Report (PDF)
              </button>
            )
          }
        </PDFDownloadLink>
        <CSVLink data={generateCSVData()} filename="booking_history.csv">
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Export Booking History (CSV)
          </button>
        </CSVLink>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>
     
      <DataTable
       columns={columns}
       data={filterData()}
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

export default BookTable;
