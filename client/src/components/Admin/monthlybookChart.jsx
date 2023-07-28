
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
      const response = await axios.get('/admin/monthlyRevenueData'); 
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
