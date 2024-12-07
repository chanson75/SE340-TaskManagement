import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TasksPage.css'; // Import the CSS file

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axios.get('http://localhost:3000/tasks');
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      const sortedTasks = result.data.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      setTasks(sortedTasks);
    };
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>All Tasks</h1>
      <button className="wide-button" onClick={() => navigate('/')}>Add another task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.due_date.slice(0, 10)}</p> {/* Format the due date */}
            <p>{task.priority}</p>
            <p>{task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;