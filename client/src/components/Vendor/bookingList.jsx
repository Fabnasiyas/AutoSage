
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
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

const BookingList = () => {
  
  const generateCSVData = () => {
    const csvData = booking.map(bookingItem => ({
      'Booking Date': formatDate(bookingItem.bookingDate),
      'Pickup Date': formatDate(bookingItem.pickupDate),
      'Dropoff Date': formatDate(bookingItem.dropoffDate),
      'Total Amount': bookingItem.totalAmount,
      'Payment Type': bookingItem.paymentType,
      'Status': isReturned(bookingItem.dropoffDate) ? 'Returned' : 'On Rent'
    }));
    return csvData;
  };

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

  const calculateSalesReportData = bookingData => {
    const totalCars = [...new Set(bookingData.map(item => item.carId))].length;
    const totalBookings = bookingData.length;
    const totalRevenue = bookingData.reduce((acc, item) => acc + item.totalAmount, 0);
    return { totalCars, totalBookings, totalRevenue };
  };

  const generatePDFData = () => {
    const salesReportData = calculateSalesReportData(booking);
    const { totalCars, totalBookings, totalRevenue } = salesReportData;

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
          </View>

          <View style={styles.bookingsTable}>
            <View style={styles.bookingsTableHeaderRow}>
              <Text style={styles.bookingsTableHeaderCell}>Booking Date</Text>
              <Text style={styles.bookingsTableHeaderCell}>Total Amount</Text>
              <Text style={styles.bookingsTableHeaderCell}>Payment Type</Text>
              <Text style={styles.bookingsTableHeaderCell}>Status</Text>
            </View>
            {booking.map((bookingItem) => (
              <View style={styles.bookingsTableRow} key={bookingItem._id}>
                <Text style={styles.bookingsTableCell}>{formatDate(bookingItem.bookingDate)}</Text>
                <Text style={styles.bookingsTableCell}>{bookingItem.totalAmount}</Text>
                <Text style={styles.bookingsTableCell}>{bookingItem.paymentType}</Text>
                <Text style={styles.bookingsTableCell}>
                  {isReturned(bookingItem.dropoffDate) ? 'Returned' : 'On Rent'}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
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
  <h1 className='text-center font-bold text-3xl mb-9'>Booking List</h1>
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


