import React from 'react';

function TaskList({ tasks }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.due_date}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
