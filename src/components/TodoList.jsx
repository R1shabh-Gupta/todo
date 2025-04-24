import React, { useState } from 'react';
import TodoItem from './TodoItem.jsx';
import '../assets/css/TodoList.css';

/**
 * TodoList component - Displays a list of todo items and handles drag-and-drop reordering.
 * @param {Object} props - The props object.
 * @param {Array} props.todos - The list of todo items.
 * @param {Function} props.toggleCompletion - Function to toggle the completion status of a todo.
 * @param {Function} props.removeTodo - Function to remove a todo.
 * @param {Function} props.editTodo - Function to edit a todo task.
 * @param {Function} props.editTodoListOrder - Function to update the order of todos after drag-and-drop.
 * @returns {JSX.Element} The rendered todo list component.
 */
const TodoList = ({
  todos,
  toggleCompletion,
  removeTodo,
  editTodo,
  editTodoListOrder,
}) => {
  const [draggedItemId, setDraggedItemId] = useState(null);

  if (0 === todos.length) {
    return (
      <div className="no-todo-message">
        <h3>No tasks yet!</h3>
        <p>You are all caught up. Add a new task to get started!</p>
      </div>
    );
  }

  /**
   * Handles the start of a drag event, setting the dragged item's ID.
   * @param {number} id - The ID of the todo item being dragged.
   * @returns {void}
   */
  const handleDragStart = id => {
    setDraggedItemId(id);
  };

  /**
   * Handles the drag over event, allowing the item to be dropped.
   * @param {Event} e - The drag over event.
   * @returns {void}
   */
  const handleDragOver = e => {
    e.preventDefault();
  };

  /**
   * Handles the drop event, reordering the items based on the dragged and dropped positions.
   * @param {number} droppedOverId - The ID of the todo item where the dragged item was dropped.
   * @returns {void}
   */
  const handleDrop = droppedOverId => {
    const draggedItemIndex = todos.findIndex(todo => todo.id === draggedItemId);
    const droppedOverIndex = todos.findIndex(todo => todo.id === droppedOverId);

    // Reorder tasks
    const reorderedTodos = [...todos];
    const [draggedItem] = reorderedTodos.splice(draggedItemIndex, 1);
    reorderedTodos.splice(droppedOverIndex, 0, draggedItem);

    setDraggedItemId(null);
    editTodoListOrder(reorderedTodos);
  };

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div
          key={todo.id}
          draggable
          onDragStart={() => handleDragStart(todo.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(todo.id)}
        >
          <TodoItem
            todo={todo}
            toggleCompletion={toggleCompletion}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
