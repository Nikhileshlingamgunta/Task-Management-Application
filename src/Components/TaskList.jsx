import React from 'react';

function TaskList({ tasks, completeTask, filter, setFilter }) {
  const filteredTasks = tasks.filter(task => {
    const isPriorityMatch = filter.priority ? task.priority === filter.priority : true;
    const isDueDateMatch = filter.dueDate ? task.dueDate === filter.dueDate : true;
    return isPriorityMatch && isDueDateMatch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <div>
      <h2>Active Tasks</h2>
      <div>
        <label>
          Filter by Priority:
          <select value={filter.priority} onChange={(e) => setFilter({...filter, priority: e.target.value})}>
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <label>
          Filter by Due Date:
          <input
            type="date"
            value={filter.dueDate}
            onChange={(e) => setFilter({...filter, dueDate: e.target.value})}
          />
        </label>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} style={{ backgroundColor: getPriorityColor(task.priority) }}>
            <input
              type="checkbox"
              onChange={() => completeTask(index)}
              checked={task.completed}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.task} - <strong>{task.priority}</strong>, Due: {task.dueDate}, Importance: {task.importance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
