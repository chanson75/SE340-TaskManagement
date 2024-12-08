import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TasksPage.css'; // Import the CSS file

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axios.get('http://localhost:3000/tasks');
      const sortedTasks = result.data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      setTasks(sortedTasks);
    };
    fetchTasks();
  }, []);

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask(task);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSaveClick = async (taskId) => {
    try {
      console.log('Saving task:', editedTask); // Debugging log
      await axios.put(`http://localhost:3000/tasks/${taskId}`, editedTask);
      setTasks(tasks.map(task => (task.id === taskId ? editedTask : task)));
      setEditingTaskId(null);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="container">
      <h1>All Tasks</h1>
      <button className="wide-button" onClick={() => navigate('/')}>Add another task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                />
                <input
                  type="date"
                  name="due_date"
                  value={editedTask.due_date.slice(0, 10)}
                  onChange={handleInputChange}
                />
                <select
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleInputChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <select
                  name="status"
                  value={editedTask.status}
                  onChange={handleInputChange}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                </select>
                <button onClick={() => handleSaveClick(task.id)}>Save</button>
              </div>
            ) : (
              <div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>{task.due_date.slice(0, 10)}</p> {/* Format the due date */}
                <p>{task.priority}</p>
                <p>{task.status}</p>
                <button onClick={() => handleEditClick(task)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage; 