import { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styled from 'styled-components';
import { Card, Select } from '../../styles/SharedStyles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseStats = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [chartData, setChartData] = useState({
    monthly: null,
    category: null,
    trend: null,
    comparison: null
  });

  useEffect(() => {
    // Fetch data based on timeRange
    fetchChartData(timeRange);
  }, [timeRange]);

  const fetchChartData = async (range) => {
    try {
      const response = await fetch(`/api/expenses/statistics?range=${range}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      setChartData({
        monthly: {
          labels: data.monthlyStats.map(stat => `${stat._id.month}/${stat._id.year}`),
          datasets: [{
            label: 'Monthly Expenses',
            data: data.monthlyStats.map(stat => stat.total),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        category: {
          labels: data.categoryStats.map(stat => stat._id),
          datasets: [{
            data: data.categoryStats.map(stat => stat.total),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF'
            ]
          }]
        },
        trend: {
          labels: data.trendStats.map(stat => stat.date),
          datasets: [{
            label: 'Expense Trend',
            data: data.trendStats.map(stat => stat.amount),
            borderColor: '#FF6384',
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
          }]
        },
        comparison: {
          labels: ['Current', 'Previous', 'Average'],
          datasets: [{
            label: 'Period Comparison',
            data: [
              data.currentPeriodTotal,
              data.previousPeriodTotal,
              data.averageTotal
            ],
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
          }]
        }
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <StatsContainer>
      <StatsHeader>
        <h2>Expense Statistics</h2>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </Select>
      </StatsHeader>

      <StatsGrid>
        <ChartCard>
          <h3>Monthly Overview</h3>
          {chartData.monthly && <Line data={chartData.monthly} />}
        </ChartCard>

        <ChartCard>
          <h3>Category Distribution</h3>
          {chartData.category && <Pie data={chartData.category} />}
        </ChartCard>

        <ChartCard>
          <h3>Expense Trend</h3>
          {chartData.trend && <Line data={chartData.trend} />}
        </ChartCard>

        <ChartCard>
          <h3>Period Comparison</h3>
          {chartData.comparison && <Bar data={chartData.comparison} />}
        </ChartCard>
      </StatsGrid>
    </StatsContainer>
  );
};

const StatsContainer = styled.div`
  padding: 1rem;
`;

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: ${props => props.theme.text};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

const ChartCard = styled(Card)`
  padding: 1.5rem;

  h3 {
    margin-bottom: 1rem;
    color: ${props => props.theme.text};
  }
`;

export default ExpenseStats; 