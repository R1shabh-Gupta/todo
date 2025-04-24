import React, { useEffect, useState } from 'react';
import '../assets/css/styles.css';
import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';

/**
 * Todo component - Main component for managing the todo list, including
 * adding, removing, editing, and filtering tasks.
 * @returns {JSX.Element} The rendered component.
 */
const Todo = () => {
  const [todos, setTodos] = useState(() => {
    // Load tasks from localStorage on initial render.
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState('All');

  // Save tasks to localStorage whenever tasks change.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
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
  const filterTasks = () => {
    switch (filter) {
      case 'Completed':
        return todos.filter(todo => todo.completed);
      case 'Pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  /**
   * Renders the main container with AddTodo, filter buttons, and TodoList components.
   * @returns {JSX.Element} The rendered component.
   */
  return (
    <div className="container">
      <h1 className="app-title">Todo</h1>
      <AddTodo addTodo={addTodo} />

      {/* Filter Buttons */}
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

      <TodoList
        todos={filterTasks()}
        removeTodo={removeTodo}
        toggleCompletion={toggleCompletion}
        editTodo={editTodo}
        editTodoListOrder={editTodoListOrder}
      />
    </div>
  );
};

export default Todo;
