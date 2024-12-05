import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks', err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="task-list">
      <h1>Tasks</h1>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.due_date}</p>
          <p>Priority: {task.priority}</p>
          <p>Tag: {task.tag}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;