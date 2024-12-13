import express from 'express';
import { auth } from '../middleware/auth.js';
import Expense from '../models/Expense.js';

const router = express.Router();

// Create expense
router.post('/', auth, async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      user: req.userId
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get expenses with filtering and pagination
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, paymentMethod, startDate, endDate, sort } = req.query;
    
    let query = { user: req.userId };
    
    // Apply filters
    if (category) query.category = category;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Apply sorting
    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOption[field] = order === 'desc' ? -1 : 1;
    }

    const expenses = await Expense.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Expense.countDocuments(query);

    res.json({
      expenses,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update expense
router.patch('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get expense statistics
router.get('/statistics', auth, async (req, res) => {
  try {
    const { year, month } = req.query;
    
    const monthlyStats = await Expense.aggregate([
      { $match: { user: req.userId } },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    const categoryStats = await Expense.aggregate([
      { $match: { user: req.userId } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);

    res.json({ monthlyStats, categoryStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update expense
router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Bulk delete expenses
router.post('/bulk-delete', auth, async (req, res) => {
  try {
    const { ids } = req.body;
    
    await Expense.deleteMany({
      _id: { $in: ids },
      user: req.userId
    });
    
    res.json({ message: 'Expenses deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router; 