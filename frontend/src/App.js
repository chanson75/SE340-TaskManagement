import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://backend:5000/tasks');
    const data = await response.json();
    setTasks(data);
  };

  return (
    <div className="App">
      <h1>Welcome to Task Manager</h1> {/* Welcome message */}
      <h2>Submit a New Task</h2> {/* Subheading for the form */}
      <TaskForm fetchTasks={fetchTasks} />
      <h2>Your Tasks</h2> {/* Subheading for the task list */}
      <div className="task-list">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
