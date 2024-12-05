import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-box">
          <h2>{task.title}</h2>
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