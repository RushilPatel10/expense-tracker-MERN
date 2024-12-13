import { useState, useEffect } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import EditExpenseModal from './EditExpenseModal';
import styled from 'styled-components';
import { Card, Input, Select, Button } from '../../styles/SharedStyles';

const ExpenseList = () => {
  const { expenses, fetchExpenses, deleteExpense, editExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    paymentMethod: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isAdvancedFiltersVisible, setIsAdvancedFiltersVisible] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortedExpenses = () => {
    const filteredExpenses = expenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                          expense.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || expense.category === filters.category;
      const matchesPayment = !filters.paymentMethod || expense.paymentMethod === filters.paymentMethod;
      const matchesDateRange = (!filters.startDate || new Date(expense.date) >= new Date(filters.startDate)) &&
                              (!filters.endDate || new Date(expense.date) <= new Date(filters.endDate));
      const matchesAmount = (!filters.minAmount || expense.amount >= Number(filters.minAmount)) &&
                           (!filters.maxAmount || expense.amount <= Number(filters.maxAmount));

      return matchesSearch && matchesCategory && matchesPayment && matchesDateRange && matchesAmount;
    });

    return [...filteredExpenses].sort((a, b) => {
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      // For string comparisons (category, description, paymentMethod)
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });
  };

  // Get current expenses for pagination
  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = getSortedExpenses().slice(indexOfFirstExpense, indexOfLastExpense);
  const totalPages = Math.ceil(getSortedExpenses().length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
      fetchExpenses();
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <ListContainer>
      <ListHeader>
        <SearchBar>
          <Input
            type="text"
            placeholder="Search expenses..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Button 
            $secondary 
            onClick={() => setIsAdvancedFiltersVisible(!isAdvancedFiltersVisible)}
          >
            {isAdvancedFiltersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </SearchBar>

        {isAdvancedFiltersVisible && (
          <AdvancedFilters>
            <FilterGroup>
              <Select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
              </Select>

              <Select
                value={filters.paymentMethod}
                onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
              >
                <option value="">All Payment Methods</option>
                <option value="cash">Cash</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="upi">UPI</option>
              </Select>
            </FilterGroup>

            <FilterGroup>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                placeholder="Start Date"
              />
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                placeholder="End Date"
              />
            </FilterGroup>

            <FilterGroup>
              <Input
                type="number"
                value={filters.minAmount}
                onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                placeholder="Min Amount"
              />
              <Input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                placeholder="Max Amount"
              />
            </FilterGroup>
          </AdvancedFilters>
        )}
      </ListHeader>

      <Table>
        <thead>
          <tr>
            <Th onClick={() => handleSort('date')}>
              Date {getSortIcon('date')}
            </Th>
            <Th onClick={() => handleSort('description')}>
              Description {getSortIcon('description')}
            </Th>
            <Th onClick={() => handleSort('amount')}>
              Amount {getSortIcon('amount')}
            </Th>
            <Th onClick={() => handleSort('category')}>
              Category {getSortIcon('category')}
            </Th>
            <Th onClick={() => handleSort('paymentMethod')}>
              Payment Method {getSortIcon('paymentMethod')}
            </Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map((expense) => (
            <tr key={expense._id}>
              <Td>{new Date(expense.date).toLocaleDateString()}</Td>
              <Td>{expense.description}</Td>
              <Td>${expense.amount.toFixed(2)}</Td>
              <Td>{expense.category}</Td>
              <Td>{expense.paymentMethod}</Td>
              <Td>
                <ActionButtons>
                  <Button onClick={() => setEditingExpense(expense)}>
                    Edit
                  </Button>
                  <Button $secondary onClick={() => handleDelete(expense._id)}>
                    Delete
                  </Button>
                </ActionButtons>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Button
          $secondary
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <PageNumbers>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              $active={currentPage === index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
        </PageNumbers>
        <Button
          $secondary
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Pagination>

      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={async (updatedExpense) => {
            await editExpense(updatedExpense);
            setEditingExpense(null);
            fetchExpenses();
          }}
        />
      )}
    </ListContainer>
  );
};

const ListContainer = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.border.default};
`;

const SearchBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const AdvancedFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  background: ${props => props.theme.background.default};
  color: ${props => props.theme.text.primary};
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  &:hover {
    background: ${props => props.theme.border.default};
  }
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid ${props => props.theme.border.default};
  color: ${props => props.theme.text.primary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 16px;
  border-top: 1px solid ${props => props.theme.border.default};
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 8px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.border.default};
  border-radius: 4px;
  background: ${props => props.$active ? props.theme.primary.main : 'transparent'};
  color: ${props => props.$active ? props.theme.primary.text : props.theme.text.primary};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.$active ? props.theme.primary.dark : props.theme.border.default};
  }
`;

export default ExpenseList; 