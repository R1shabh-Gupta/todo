import React, { useEffect, useMemo, useState } from 'react';
import '../assets/css/styles.css';
import { useNotification } from '../context/NotificationContext';
import AddTodo from './AddTodo.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import TodoList from './TodoList.jsx';

/**
 * Todo component - Main component for managing the todo list, including
 * adding, removing, editing, and filtering tasks.
 * @returns {JSX.Element} The rendered component.
 */
const Todo = () => {
  const [todos, setTodos] = useState(() => {
    try {
      // Load tasks from localStorage on initial render.
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  });

  const [filter, setFilter] = useState('All');
  const [showClearAllModal, setShowClearAllModal] = useState(false);

  const { addNotification } = useNotification();

  // Save tasks to localStorage whenever tasks change.
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === 'QuotaExceededError' ||
          error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      ) {
        console.error(
          'Local storage quota exceeded when saving todos: ',
          error
        );
      } else {
        console.error('Failed to save todos to local storage: ', error);
      }
    }
  }, [todos]);

  /**
   * Adds a new todo to the list.
   * @param {string} task - The task description to be added.
   * @returns {void}
   */
  const addTodo = task => {
    const newTodo = {
      id: Date.now(),
      task,
      completed: false,
      addedTime: new Date().toLocaleString(),
      modifiedTime: null,
    };

    setTodos([...todos, newTodo]);
  };

  /**
   * Removes a todo from the list.
   * @param {number} id - The ID of the todo to be removed.
   * @returns {void}
   */
  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  /**
   * Clears all todos from the list.
   * @returns {void}
   */
  const clearAllTodos = () => {
    setTodos([]);

    addNotification('All tasks have been deleted', 'error');

    setShowClearAllModal(false);
  };

  /**
   * Opens the confirmation modal for clearing all todos.
   * @returns {void}
   */
  const handleClearAllClick = () => {
    if (todos.length === 0) {
      addNotification('No tasks to delete', 'warning');
      return;
    }

    setShowClearAllModal(true);
  };

  /**
   * Cancels the clear all operation and closes the modal.
   * @returns {void}
   */
  const cancelClearAll = () => {
    setShowClearAllModal(false);
  };

  /**
   * Toggles the completion status of a todo.
   * @param {number} id - The ID of the todo to be toggled.
   * @returns {void}
   */
  const toggleCompletion = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Edits a todo task and updates its modified time.
   * @param {number} id - The ID of the todo to be edited.
   * @param {string} newTask - The updated task description.
   * @returns {void}
   */
  const editTodo = (id, newTask) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              task: newTask,
              modifiedTime: new Date().toLocaleString(),
            }
          : todo
      )
    );
  };

  /**
   * Updates the order of the todo list based on drag-and-drop reordering.
   * @param {Array} reorderedTodos - The updated list of todos after reordering.
   * @returns {void}
   */
  const editTodoListOrder = reorderedTodos => {
    setTodos(reorderedTodos);
  };

  /**
   * Filters tasks based on the selected filter type (All, Completed, Pending).
   * @returns {Array} A filtered list of todos.
   */
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'Completed':
        return todos.filter(todo => todo.completed);
      case 'Pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  /**
   * Renders the main container with AddTodo, filter buttons, and TodoList components.
   * @returns {JSX.Element} The rendered component.
   */
  return (
    <div className="container">
      <h1 className="app-title">Todo</h1>
      <AddTodo addTodo={addTodo} />

      <div className="todos-actions">
        <div className="filter-buttons">
          <button
            onClick={() => setFilter('All')}
            className={'All' === filter ? 'active' : ''}
          >
            All
          </button>

          <button
            onClick={() => setFilter('Completed')}
            className={'Completed' === filter ? 'active' : ''}
          >
            Completed
          </button>

          <button
            onClick={() => setFilter('Pending')}
            className={'Pending' === filter ? 'active' : ''}
          >
            Pending
          </button>
        </div>
      </div>

      <TodoList
        todos={filteredTodos}
        removeTodo={removeTodo}
        toggleCompletion={toggleCompletion}
        editTodo={editTodo}
        editTodoListOrder={editTodoListOrder}
      />

      <ConfirmationModal
        isOpen={showClearAllModal}
        message="Are you sure you want to delete all tasks? This action cannot be undone."
        onConfirm={clearAllTodos}
        onCancel={cancelClearAll}
      />

      <button
        onClick={handleClearAllClick}
        className="clear-all-button"
        disabled={todos.length === 0}
      >
        Clear All
      </button>
    </div>
  );
};

export default Todo;
