import { useState, useEffect } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';
import { Card, Select } from '../../styles/SharedStyles';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseStats = () => {
  const { expenses } = useExpenses();
  const [timeRange, setTimeRange] = useState('month');
  const [expenseData, setExpenseData] = useState({
    monthly: [],
    category: {},
    paymentMethod: {}
  });

  useEffect(() => {
    if (expenses.length > 0) {
      processExpenseData();
    }
  }, [expenses, timeRange]);

  const processExpenseData = () => {
    const now = new Date();
    const monthlyData = {};
    const categoryData = {};
    const paymentData = {};

    // Filter and process expenses based on time range
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const monthKey = expenseDate.toLocaleString('default', { month: 'short', year: 'numeric' });
      const monthDiff = (now.getFullYear() - expenseDate.getFullYear()) * 12 + 
                       (now.getMonth() - expenseDate.getMonth());

      if ((timeRange === 'month' && monthDiff <= 6) || 
          (timeRange === 'year' && monthDiff <= 12)) {
        // Monthly data
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + Number(expense.amount);

        // Category data
        categoryData[expense.category] = (categoryData[expense.category] || 0) + Number(expense.amount);

        // Payment method data
        paymentData[expense.paymentMethod] = (paymentData[expense.paymentMethod] || 0) + Number(expense.amount);
      }
    });

    setExpenseData({
      monthly: monthlyData,
      category: categoryData,
      paymentMethod: paymentData
    });
  };

  const lineChartData = {
    labels: Object.keys(expenseData.monthly),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(expenseData.monthly),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(expenseData.category),
    datasets: [
      {
        data: Object.values(expenseData.category),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899',
        ],
      },
    ],
  };

  const paymentChartData = {
    labels: Object.keys(expenseData.paymentMethod),
    datasets: [
      {
        data: Object.values(expenseData.paymentMethod),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <StatsContainer>
      <StatsHeader>
        <h2>Expense Analytics</h2>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="month">Last 6 Months</option>
          <option value="year">Last Year</option>
        </Select>
      </StatsHeader>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Expense Trend</ChartTitle>
          <ChartWrapper>
            <Line data={lineChartData} options={chartOptions} />
          </ChartWrapper>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Expenses by Category</ChartTitle>
          <ChartWrapper>
            <Doughnut data={categoryChartData} options={chartOptions} />
          </ChartWrapper>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Payment Methods</ChartTitle>
          <ChartWrapper>
            <Bar data={paymentChartData} options={chartOptions} />
          </ChartWrapper>
        </ChartCard>

        <SummaryCard>
          <ChartTitle>Summary</ChartTitle>
          <SummaryContent>
            <SummaryItem>
              <SummaryLabel>Total Expenses</SummaryLabel>
              <SummaryValue>
                ${Object.values(expenseData.monthly).reduce((a, b) => a + b, 0).toFixed(2)}
              </SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Average Monthly</SummaryLabel>
              <SummaryValue>
                ${(Object.values(expenseData.monthly).reduce((a, b) => a + b, 0) / 
                   Math.max(Object.keys(expenseData.monthly).length, 1)).toFixed(2)}
              </SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Highest Category</SummaryLabel>
              <SummaryValue>
                {Object.entries(expenseData.category).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
              </SummaryValue>
            </SummaryItem>
          </SummaryContent>
        </SummaryCard>
      </ChartsGrid>
    </StatsContainer>
  );
};

const StatsContainer = styled.div`
  padding: 24px;
`;

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 1.5rem;
    color: ${props => props.theme.text.primary};
  }

  select {
    width: auto;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(Card)`
  padding: 24px;
  height: 400px;
`;

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  color: ${props => props.theme.text.primary};
  margin-bottom: 16px;
`;

const ChartWrapper = styled.div`
  height: calc(100% - 40px);
`;

const SummaryCard = styled(Card)`
  padding: 24px;
`;

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${props => props.theme.border.light};

  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  color: ${props => props.theme.text.secondary};
  font-size: 0.875rem;
`;

const SummaryValue = styled.span`
  color: ${props => props.theme.text.primary};
  font-weight: 600;
`;

export default ExpenseStats; 