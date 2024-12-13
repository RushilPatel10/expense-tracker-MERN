import { useState } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import styled from 'styled-components';

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash'
  });
  const { addExpense } = useExpenses();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setFormData({
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'cash'
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <FormContainer>
      <h2>Add New Expense</h2>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Amount</Label>
          <Input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            min="0"
            step="0.01"
          />
        </InputGroup>

        <InputGroup>
          <Label>Description</Label>
          <Input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Category</Label>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>Date</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Payment Method</Label>
          <Select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            required
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
          </Select>
        </InputGroup>

        <Button type="submit">Add Expense</Button>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.8rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: #218838; }
`;

export default ExpenseForm; 