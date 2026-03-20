import React, { useState, useRef, useCallback, useEffect } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = useCallback((e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (formData.amount && formData.date) {
      onAddExpense({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setFormData({ amount: '', category: '', date: '', description: '' });
      inputRef.current?.focus();
    }
  }, [formData, onAddExpense]);

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        step="0.01"
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        name="description"
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;

