import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Input, Select, FormGroup, Label, Card } from '../../styles/SharedStyles';

const EditExpenseModal = ({ expense, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: '',
    paymentMethod: ''
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount,
        description: expense.description,
        category: expense.category,
        date: new Date(expense.date).toISOString().split('T')[0],
        paymentMethod: expense.paymentMethod
      });
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: expense._id });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <FormCard>
          <FormHeader>
            <h2>Edit Expense</h2>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Amount</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                step="0.01"
                min="0"
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              <Button type="button" $secondary onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </ButtonGroup>
          </form>
        </FormCard>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const FormCard = styled(Card)`
  width: 100%;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    color: ${props => props.theme.text.primary};
    font-size: 1.5rem;
    margin: 0;
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

export default EditExpenseModal; 