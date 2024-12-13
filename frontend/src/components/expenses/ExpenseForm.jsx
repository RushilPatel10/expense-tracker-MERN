import { useState } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import styled from 'styled-components';
import { Card, Button, Input, Select, FormGroup, Label } from '../../styles/SharedStyles';

const ExpenseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash'
  });

  const { addExpense } = useExpenses();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addExpense(formData);
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard>
      <FormHeader>
        <h2>Add New Expense</h2>
        <CloseButton onClick={() => onClose && onClose()}>&times;</CloseButton>
      </FormHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Amount</Label>
          <Input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Enter amount"
            required
            min="0"
            step="0.01"
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <Input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Category</Label>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Date</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Payment Method</Label>
          <Select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            required
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="upi">UPI</option>
          </Select>
        </FormGroup>

        <ButtonGroup>
          <Button type="button" $secondary onClick={() => onClose && onClose()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Expense'}
          </Button>
        </ButtonGroup>
      </form>
    </FormCard>
  );
};

const FormCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    color: ${props => props.theme.text.primary};
    font-size: 1.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  
  &:hover {
    color: ${props => props.theme.text.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.error.main};
  background: ${props => props.theme.error.light}20;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export default ExpenseForm; 