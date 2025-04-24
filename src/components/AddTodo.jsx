import React, { useRef, useState } from 'react';
import '../assets/css/AddTodo.css';
import { useNotification } from '../context/NotificationContext';

/**
 * AddTodo component - A form for adding a new todo task.
 * @param {Object} props - The props object.
 * @param {Function} props.addTodo - The function to add a new task.
 * @returns {JSX.Element} The rendered component for adding a new todo.
 */
const AddTodo = ({ addTodo }) => {
  const taskInputRef = useRef(null);
  const { addNotification } = useNotification();
  const maxCharLimit = 100;
  const [inputError, setInputError] = useState(false);

  /**
   * Handles form submission to add a new task.
   * Validates input and displays notifications on success or failure.
   * @param {Event} e - The form submission event.
   * @returns {void}
   */
  const handleSubmit = e => {
    e.preventDefault();

    const task = taskInputRef.current.value.trim();

    if (task.length > maxCharLimit) {
      addNotification(
        `Task cannot be longer than ${maxCharLimit} characters.`,
        'error'
      );
      setInputError(true);
      return;
    }

    if (task) {
      addTodo(task);
      addNotification('Task added successfully!', 'success');
      taskInputRef.current.value = '';
      setInputError(false);
    } else {
      addNotification('Please enter a task!', 'warning');
    }
  };

  /**
   * Handles input change events to validate character length.
   * Sets error state when the input exceeds the maximum character limit.
   * @returns {void}
   */
  const handleInputChange = () => {
    const task = taskInputRef.current.value;
    if (task.length > maxCharLimit) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };

  return (
    <div className="add-todo-container">
      <form onSubmit={handleSubmit} className="add-todo">
        <input
          type="text"
          ref={taskInputRef}
          placeholder="Add a new task (max 100 characters)"
          onChange={handleInputChange}
        />

        <button type="submit">Add</button>
      </form>
      {/* Display error message when input exceeds character limit */}
      {inputError && (
        <small className="input-error">
          Task cannot exceed {maxCharLimit} characters.
        </small>
      )}
    </div>
  );
};

export default AddTodo;
