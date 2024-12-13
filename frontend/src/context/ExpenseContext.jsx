import { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext(null);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchExpenses = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      });
      setExpenses(response.data.expenses);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching expenses');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addExpense = async (expenseData) => {
    try {
      const response = await axios.post('/api/expenses', expenseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Error adding expense');
    }
  };

  const editExpense = async (id, expenseData) => {
    try {
      const response = await axios.put(`/api/expenses/${id}`, expenseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(prev => 
        prev.map(expense => 
          expense._id === id ? response.data : expense
        )
      );
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Error updating expense');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(prev => prev.filter(expense => expense._id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Error deleting expense');
    }
  };

  const bulkDeleteExpenses = async (ids) => {
    try {
      await axios.post('/api/expenses/bulk-delete', { ids }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(prev => prev.filter(expense => !ids.includes(expense._id)));
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Error deleting expenses');
    }
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      loading,
      error,
      fetchExpenses,
      addExpense,
      editExpense,
      deleteExpense,
      bulkDeleteExpenses
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext); 