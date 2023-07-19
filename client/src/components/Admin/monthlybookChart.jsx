// // import React from 'react';
// // import { ResponsiveBar } from '@nivo/bar';

// // const MonthlyBookingBarChart = () => {
// //   // Dummy data for the monthly bookings bar chart
// //   const data = [
// //     { month: 'Jan', bookings: 20 },
// //     { month: 'Feb', bookings: 25 },
// //     { month: 'Mar', bookings: 18 },
// //     { month: 'Apr', bookings: 30 },
// //     { month: 'May', bookings: 15 },
// //     { month: 'Jun', bookings: 22 },
// //     { month: 'Jul', bookings: 28 },
// //     { month: 'Aug', bookings: 35 },
// //     { month: 'Sep', bookings: 42 },
// //     { month: 'Oct', bookings: 50 },
// //     { month: 'Nov', bookings: 38 },
// //     { month: 'Dec', bookings: 45 },
// //   ];

// //   return (
// //     <div style={{width:'1151px',marginTop:'100px' }}>
// //       <h3 className="text-3xl font-bold dark:text-white mb-4">Monthly Revenue</h3>
// //       <div style={{ height: "500px" }}>
// //         <ResponsiveBar
// //           data={data}
// //           keys={["bookings"]}
// //           indexBy="month"
// //           margin={{ top: 50, right: 100, bottom: 50, left: 100 }} // Adjust margins for better appearance
// //           padding={0.3} // Adjust padding between bars
// //           valueScale={{ type: "linear" }}
// //           colors="#3182CE"
// //           animate={true}
// //           enableLabel={false}
// //           axisTop={null}
// //           axisRight={null}
// //           axisLeft={{
// //             tickSize: 5,
// //             tickPadding: 5,
// //             tickRotation: 0,
// //             legend: "bookings",
// //             legendPosition: "middle",
// //             legendOffset: -40
// //           }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// export default MonthlyBookingBarChart;
import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import axios from '../../axios';

const MonthlyBookingBarChart = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    fetchMonthlyRevenueData();
  }, []);

  const fetchMonthlyRevenueData = async () => {
    try {
      const response = await axios.get('/admin/monthlyRevenueData'); // Replace with the correct API endpoint to fetch monthly revenue data
      setMonthlyRevenue(response.data);
    } catch (error) {
      console.error('Error fetching monthly revenue data:', error);
    }
  };

  return (
    <div style={{ width: '1151px', marginTop: '100px' }}>
      <h3 className="text-3xl font-bold dark:text-white mb-4">Monthly Revenue</h3>
      <div style={{ height: "500px" }}>
        <ResponsiveBar
          data={monthlyRevenue}
          keys={["revenue"]}
          indexBy="month"
          margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          colors="#3182CE"
          animate={true}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "revenue",
            legendPosition: "middle",
            legendOffset: -40
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyBookingBarChart;
