import { useState, useEffect } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import styled from 'styled-components';
import { Card, Input, Select, Button } from '../../styles/SharedStyles';

const ExpenseList = () => {
  const { expenses, fetchExpenses, deleteExpense } = useExpenses();
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    paymentMethod: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [isAdvancedFiltersVisible, setIsAdvancedFiltersVisible] = useState(false);

  useEffect(() => {
    fetchExpenses(filters);
  }, [filters, fetchExpenses]);

  const handleSort = (field) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleBulkDelete = async () => {
    if (window.confirm('Are you sure you want to delete selected expenses?')) {
      await Promise.all(selectedExpenses.map(id => deleteExpense(id)));
      setSelectedExpenses([]);
      fetchExpenses(filters);
    }
  };

  const toggleExpenseSelection = (id) => {
    setSelectedExpenses(prev => 
      prev.includes(id) 
        ? prev.filter(expId => expId !== id)
        : [...prev, id]
    );
  };

  return (
    <ListContainer>
      <ListHeader>
        <SearchBar>
          <Input
            type="text"
            placeholder="Search expenses..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
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
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">All Categories</option>
                {/* Add categories from settings */}
              </Select>

              <Select
                value={filters.paymentMethod}
                onChange={(e) => setFilters(prev => ({ ...prev, paymentMethod: e.target.value }))}
              >
                <option value="">All Payment Methods</option>
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
              </Select>
            </FilterGroup>

            <FilterGroup>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              />
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </FilterGroup>

            <FilterGroup>
              <Input
                type="number"
                placeholder="Min Amount"
                value={filters.minAmount}
                onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Max Amount"
                value={filters.maxAmount}
                onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
              />
            </FilterGroup>
          </AdvancedFilters>
        )}
      </ListHeader>

      {selectedExpenses.length > 0 && (
        <BulkActions>
          <span>{selectedExpenses.length} items selected</span>
          <Button onClick={handleBulkDelete}>Delete Selected</Button>
        </BulkActions>
      )}

      <Table>
        <thead>
          <tr>
            <Th>
              <input
                type="checkbox"
                onChange={(e) => {
                  setSelectedExpenses(
                    e.target.checked ? expenses.map(exp => exp._id) : []
                  );
                }}
              />
            </Th>
            <Th onClick={() => handleSort('date')}>Date</Th>
            <Th onClick={() => handleSort('amount')}>Amount</Th>
            <Th onClick={() => handleSort('category')}>Category</Th>
            <Th>Description</Th>
            <Th>Payment Method</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense._id}>
              <Td>
                <input
                  type="checkbox"
                  checked={selectedExpenses.includes(expense._id)}
                  onChange={() => toggleExpenseSelection(expense._id)}
                />
              </Td>
              <Td>{new Date(expense.date).toLocaleDateString()}</Td>
              <Td>${expense.amount.toFixed(2)}</Td>
              <Td>{expense.category}</Td>
              <Td>{expense.description}</Td>
              <Td>{expense.paymentMethod}</Td>
              <Td>
                <ActionButtons>
                  <Button $secondary onClick={() => handleEdit(expense._id)}>Edit</Button>
                  <Button onClick={() => handleDelete(expense._id)}>Delete</Button>
                </ActionButtons>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ListContainer>
  );
};

const ListContainer = styled(Card)`
  overflow: auto;
`;

const ListHeader = styled.div`
  margin-bottom: 1rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AdvancedFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.lightGray};
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  cursor: pointer;
  background: ${props => props.theme.lightGray};

  &:hover {
    background: ${props => props.theme.gray};
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.lightGray};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BulkActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.lightGray};
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export default ExpenseList; 