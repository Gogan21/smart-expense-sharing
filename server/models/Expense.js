import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide expense title'],
    trim: true,
    maxlength: 100
  },
  amount: {
    type: Number,
    required: [true, 'Please provide amount'],
    min: [0.01, 'Amount must be greater than 0']
  },
  category: {
    type: String,
    enum: ['food', 'transport', 'accommodation', 'entertainment', 'utilities', 'shopping', 'health', 'other'],
    default: 'other'
  },
  description: {
    type: String,
    maxlength: 500,
    default: ''
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  splits: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: Number,
    percentage: Number,
    splitType: {
      type: String,
      enum: ['equal', 'percentage', 'custom'],
      default: 'equal'
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  attachments: [String],
  notes: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);
