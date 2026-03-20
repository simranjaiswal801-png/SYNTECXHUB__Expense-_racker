import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Total expenses memoized
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
  }, [expenses]);

  // Filtered expenses for weekly/monthly
  const [filter, setFilter] = useState('all');

  const filteredExpenses = useMemo(() => {
    const now = new Date();
    return expenses.filter(expense => {
      const expDate = new Date(expense.date);
      if (filter === 'weekly') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return expDate >= weekAgo;
      }
      if (filter === 'monthly') {
        return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [expenses, filter]);

  // Optimized callbacks
  const addExpense = useCallback((newExpense) => {
    setExpenses(prev => [...prev, { id: Date.now(), ...newExpense }]);
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  }, []);

  const updateFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="stats">
        <h2>Total: ₹{totalExpenses.toFixed(2)}</h2>
        <select onChange={(e) => updateFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
      <ExpenseChart expenses={filteredExpenses} />
    </div>
  );
}

export default App;

