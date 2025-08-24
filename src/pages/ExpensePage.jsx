// src/pages/ExpensePage.jsx
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';

// ExpensePage Component
// For managing individual expenses (add, view, edit, delete)
const ExpensePage = () => {
  const { displayModal } = useAppContext();
  const [expenses, setExpenses] = useState([]); // Start with an empty array
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({
    id: null,
    name: '',
    amount: '',
    date: '',
    category: '',
  });

  const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other'];

  // Fetch expenses on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      displayModal('Fetching expenses...', 'info');
      // --- Start of API call replacement ---
      // Get the userId from wherever it's stored in your application (e.g., context, state, props)
      // For this example, I'll assume a hardcoded userId for demonstration,
      // but you should replace '2' with your dynamic userId.
      const userId = 2; // <<< IMPORTANT: Replace with your actual dynamic userId

      try {
        const response = await fetch(`http://localhost:5555/expense/getExpenseByUserId/${userId}`);

        if (response.ok) {
          const data = await response.json();
          // Assuming your backend returns an array of expense objects directly
          setExpenses(data);
          displayModal('Expenses loaded!', 'success');
        } else {
          // Attempt to parse error message from the response
          let errorMessage = 'Failed to load expenses.';
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            // If response is not JSON, use a generic message or response text
            errorMessage = `Failed to load expenses. Status: ${response.status} ${response.statusText}`;
          }
          displayModal(errorMessage, 'error');
        }
      } catch (error) {
        console.error('Expenses API error:', error);
        displayModal('Network error or server unavailable.', 'error');
      }
      // --- End of API call replacement ---
    };
    fetchExpenses();
  }, []); // displayModal is a dependency because it's used inside the effect

  const handleAddEditSubmit = async (e) => { // Added async
    e.preventDefault();
    if (isEditing) {
      // Update expense
      // --- Replace this with your actual API call ---
      try {
        const response = await fetch(`http://localhost:5555/expense/addExpense`, { // Replace with your Spring Boot endpoint
          method: 'PUT', // or PATCH
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...currentExpense, amount: parseFloat(currentExpense.amount) }),
        });

        if (response.ok) {
          setExpenses(
            expenses.map((exp) =>
              exp.id === currentExpense.id ? { ...currentExpense, amount: parseFloat(currentExpense.amount) } : exp
            )
          );
          displayModal('Expense updated successfully!', 'success');
        } else {
          const errorData = await response.json();
          displayModal(errorData.message || 'Failed to update expense.', 'error');
        }
      } catch (error) {
        console.error('Update expense API error:', error);
        displayModal('Network error or server unavailable.', 'error');
      }
      // --- End of API call replacement ---
    } else {
      // Add new expense
      // --- Replace this with your actual API call ---
      try {
        const response = await fetch('/api/expenses', { // Replace with your Spring Boot endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...currentExpense, amount: parseFloat(currentExpense.amount) }),
        });

        if (response.ok) {
          const newExpense = await response.json(); // Assuming backend returns the created expense with an ID
          setExpenses([...expenses, newExpense]);
          displayModal('Expense added successfully!', 'success');
        } else {
          const errorData = await response.json();
          displayModal(errorData.message || 'Failed to add expense.', 'error');
        }
      } catch (error) {
        console.error('Add expense API error:', error);
        displayModal('Network error or server unavailable.', 'error');
      }
      // --- End of API call replacement ---
    }
    // Reset form
    setCurrentExpense({ id: null, name: '', amount: '', date: '', category: '' });
    setIsEditing(false);
  };

  const handleEditClick = (expense) => {
    setCurrentExpense({ ...expense, amount: expense.amount.toFixed(2) }); // Format amount for input
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  const handleDeleteClick = async (id) => { // Added async
    // In a real app, you'd show a custom modal for confirmation.
    // For now, let's keep it simple.
    if (window.confirm('Are you sure you want to delete this expense?')) {
      // --- Replace this with your actual API call ---
      try {
        const response = await fetch(`/api/expenses/${id}`, { // Replace with your Spring Boot endpoint
          method: 'DELETE',
        });

        if (response.ok) {
          setExpenses(expenses.filter((exp) => exp.id !== id));
          displayModal('Expense deleted successfully!', 'success');
        } else {
          const errorData = await response.json();
          displayModal(errorData.message || 'Failed to delete expense.', 'error');
        }
      } catch (error) {
        console.error('Delete expense API error:', error);
        displayModal('Network error or server unavailable.', 'error');
      }
      // --- End of API call replacement ---
    }
  };

  const clearForm = () => {
    setCurrentExpense({ id: null, name: '', amount: '', date: '', category: '' });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Expenses</h1>

      {/* Add/Edit Expense Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {isEditing ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        <form onSubmit={handleAddEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="expenseName">
              Expense Name
            </label>
            <input
              type="text"
              id="expenseName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Coffee, Rent"
              value={currentExpense.name}
              onChange={(e) => setCurrentExpense({ ...currentExpense, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="expenseAmount">
              Amount
            </label>
            <input
              type="number"
              id="expenseAmount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 15.00"
              step="0.01"
              value={currentExpense.amount}
              onChange={(e) => setCurrentExpense({ ...currentExpense, amount: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="expenseDate">
              Date
            </label>
            <input
              type="date"
              id="expenseDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={currentExpense.date}
              onChange={(e) => setCurrentExpense({ ...currentExpense, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="expenseCategory">
              Category
            </label>
            <select
              id="expenseCategory"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={currentExpense.category}
              onChange={(e) => setCurrentExpense({ ...currentExpense, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              {isEditing ? 'Update Expense' : 'Add Expense'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={clearForm}
                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Expense List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Expense List</h2>
        {expenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 rounded-bl-lg">
                      {expense.title}
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.category}
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.createdAt}
                    </td>
                  
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 rounded-br-lg">
                      <button
                        onClick={() => handleEditClick(expense)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(expense.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-150"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensePage;