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
      <h1>Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
