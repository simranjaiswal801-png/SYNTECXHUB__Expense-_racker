import React from 'react';

function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      <h3>Expenses ({expenses.length})</h3>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div>
<strong>₹{(expense.amount || 0).toFixed(2)}</strong>
              <br />
              <small>{expense.date} - {expense.description}</small>
            </div>
            <button className="delete-btn" onClick={() => onDelete(expense.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;

